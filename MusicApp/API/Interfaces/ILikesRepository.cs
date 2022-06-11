using System.Collections.Generic;
using API.DTOs;
using API.Entities;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId,int likedUserId);//to do like
        Task<AppUser> GetUserWithLikes(int userId);//to get user with his likes
        Task<PagedList<LikeDto>> GetUserLikes(LikeParams likeParams);//to get list of users + their likes    
    }
}