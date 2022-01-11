
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("[controller]")]
    public class AccountController : BaseApiController
    {
         private readonly DataContext _context;

        public AccountController(DataContext context)
        {

            _context=context;
        }

        [HttpPost("register")]
         public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            using var hmac =new HMACSHA512();
            if(await UserExists(registerDto.Username)) return BadRequest("Username alredy exists");
            var user =new AppUser
            {
                UserName=registerDto.Username.ToLower(),
                PasswordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt=hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            var user=await this._context.Users.SingleOrDefaultAsync(x=>x.UserName==loginDto.Username);
            if(user==null) return Unauthorized("invalid username");
            using var hmac=new HMACSHA512(user.PasswordSalt);
            var computeHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++)
            {
              if(computeHash[i]!=user.PasswordSalt[i])
              return Unauthorized("invalid password");
            }
            return user;
        }
        private async Task<bool> UserExists(string username)
        {
          return  await _context.Users.AnyAsync(x=>x.UserName.ToLower()==username.ToLower());
        }
    }
}