using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using AutoMapper;
using API.DTOs;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDtos memberUpdateDtos){
            var username= User.FindFirst(ClaimTypes.NameIdentifier)?.Value;//Bring me my claim-nameId
            var user=await _userRepository.GetUserByNameAsync(username);
            _mapper.Map(memberUpdateDtos,user);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }
            return BadRequest("Failed to update user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            var usersToReturn=_mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(usersToReturn);
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByNameAsync(username);
            var userToReturn=_mapper.Map<MemberDto>(user);
            return userToReturn;
        }
    }
}