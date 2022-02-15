using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public string InstrumentType { get; set; }
        public DateTime UpLoaded { get; set; }
        public DateTime LastApdate { get; set; }
        public string Cost { get; set; }
        public string Introduction { get; set; }
        public string SuitablFor { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<PhotoDto> Photos { get; set; } 
    }
}