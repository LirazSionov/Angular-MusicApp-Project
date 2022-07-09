using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            // var query= _context.Users
            // .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            // .AsNoTracking();
            var query= _context.Users.AsQueryable();
            query=query.Where(x=>x.UserName!=userParams.CurrentUsername);
            query=query.Where(x=>x.InstrumentType==userParams.InstrumentType);

            var minCost=int.Parse(userParams.MinCost);
            var maxCost=int.Parse(userParams.MaxCost);

            query=query.Where(x=>((x.Cost)>=minCost)&&((x.Cost)<=maxCost));

            query=userParams.OrderBy switch{
                "upLoaded"=>query.OrderByDescending(x=>x.UpLoaded),
                _=>query.OrderByDescending(x=>x.LastApdate),
            };

            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .AsNoTracking(),
                userParams.PageNumber,
                userParams.PageSize);
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
            .Where(x=>x.UserName==username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByNameAsync(string username)
        {
            return await _context.Users
            .Include(x => x.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(x => x.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            //    var changes=await _context.SaveChangesAsync();
            //    var numOfChanges=_context.ChangeTracker.Entries<AppUser>().Count();
            //   return changes==numOfChanges;
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry<AppUser>(user).State = EntityState.Modified;
        }
    }
}