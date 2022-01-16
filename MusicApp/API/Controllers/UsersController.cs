using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
     public UsersController(DataContext context)
     {
            _context = context;
         
     }   
    [Authorize]
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