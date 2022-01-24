using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
     public UsersController(DataContext context)
     {
         _context = context;
     }   
    [AllowAnonymous]
    [HttpGet]
     public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
     {
         var users=await _context.Users.ToListAsync();
         return users;
     }
     [Authorize]
     [HttpGet("{id}")]
     public async Task<ActionResult<AppUser>> GetUser(int id)
     {
         var user=await _context.Users.FindAsync(id);
         return user;
     }
    }
}