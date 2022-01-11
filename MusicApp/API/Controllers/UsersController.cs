using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using System.Linq;
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
    [HttpGet]
     public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
     {
         var users=await _context.Users.ToListAsync();
         return users;
     }

     [HttpGet("{id}")]
     public async Task<ActionResult<AppUser>> GetUser(int id)
     {
         var user=await _context.Users.FindAsync(id);
         return user;
     }
    }
}