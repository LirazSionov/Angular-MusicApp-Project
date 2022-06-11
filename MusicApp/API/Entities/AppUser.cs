using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash {get ;set ;}
        public byte[] PasswordSalt {get ;set ;}
        public string InstrumentType { get; set; }
        public DateTime UpLoaded { get; set; }=DateTime.Now;
        public DateTime LastApdate { get; set; }=DateTime.Now;
        public string Cost { get; set; }
        public string Introduction { get; set; }
        public string SuitablFor { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; } 
        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }
        public ICollection<Message> MessagesSent { get; set; }     
        public ICollection<Message> MessagesRecieved { get; set; }     
    }
}