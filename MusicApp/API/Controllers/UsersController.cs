using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using AutoMapper;
using API.DTOs;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using System.Linq;
using API.Helpers;
using System.Collections.Generic;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;

        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDtos memberUpdateDtos)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByNameAsync(username);
            _mapper.Map(memberUpdateDtos, user);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }
            return BadRequest("Failed to update user");
        }
        //  [HttpGet]
        // public async Task<ActionResult<List<AppUser>>> GetUsers()
        // {
        //     var users = await _userRepository.GetMembers2Async();
        //     // Response.AddPaginationHeader(
        //     //     users.CurrentPage,
        //     //     users.PageSize,
        //     //     users.TotalCount,
        //     //     users.TotalPages
        //     // );
        //     return Ok(users);
        // }

        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var user = await _userRepository.GetUserByNameAsync(User.GetUsername());
            if (string.IsNullOrEmpty(userParams.InstrumentType))
            {
                userParams.InstrumentType = "piano";
            }
            userParams.CurrentUsername=user.UserName;
            var users = await _userRepository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(
                users.CurrentPage,
                users.PageSize,
                users.TotalCount,
                users.TotalPages
            );
            return Ok(users);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByNameAsync(username);
            var userToReturn = _mapper.Map<MemberDto>(user);
            return userToReturn;
        }
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByNameAsync(username);
            var result = await _photoService.UploadPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            photo.IsMain = user.Photos.Count == 0;//The same like : if(user.Photos.Count==0){photo.IsMain=true}
            user.Photos.Add(photo);
            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }
            return BadRequest("Problem adding photos");
        }
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByNameAsync(username);
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo.IsMain) return BadRequest("This is alredy the main photo");
            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to set the main photo");
        }
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByNameAsync(username);
            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);


            if (photo == null) return BadRequest("Photo not found");

            if (photo.IsMain) return BadRequest("U can't delete the main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if (await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to delete photo");
        }
    }
}