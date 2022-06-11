using System;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }
        //Track sender
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }
        //Track recipient
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientPhotoUrl { get; set; }
        //About the content of the massage
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
        
    }
}