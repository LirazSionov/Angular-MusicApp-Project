using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessagesRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly Mapper _mapper;
        public MessagesRepository(DataContext context, Mapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddMessage(Message message)
        {
            _context.Message.Add(message);
        }

        public void DeleteMessage(Message messages)
        {
            _context.Message.Remove(messages);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Message.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
             var query=_context.Message
            .OrderByDescending(m=>m.MessageSent)
            .AsQueryable();

            query=messageParams.Container switch
            {
                "Inbox" => query.Where(u=>u.Recipient.UserName == messageParams.Username),
                "Outbox" => query.Where(u=>u.Sender.UserName == messageParams.Username),
                _ => query.Where(u=>u.Recipient.UserName == messageParams.Username && u.DateRead == null)
            };
            query = query.Where(m => (
                (m.Recipient.UserName == messageParams.Username && !m.RecipientDeleted) || 
                            (m.Sender.UserName == messageParams.Username && !m.SenderDeleted)
            ));
            
            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);
            return await PagedList<MessageDto>.CreateAsync(messages,messageParams.PageNumber,messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string RecipientUsername)
        {
            var messages = await _context.Message
            .Include(u=>u.Sender).ThenInclude(p => p.Photos)
            .Include(u=>u.Recipient).ThenInclude(p => p.Photos)
            .Where(m =>
                m.Recipient.UserName == currentUsername && m.Sender.UserName == RecipientUsername ||
                m.Recipient.UserName == RecipientUsername  && m.Sender.UserName == currentUsername)
                .Where(m => (m.Recipient.UserName == currentUsername && !m.RecipientDeleted) ||
                            (m.Sender.UserName == currentUsername && !m.SenderDeleted))
                .OrderBy(m => m.MessageSent)
                .ToListAsync();

            if(await updateUnread(messages,currentUsername) == -1){
                throw new Exception("could not save to DB all the date");
            }

            return _mapper.Map<IEnumerable<MessageDto>>(messages);

        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }
        private async Task<int> updateUnread(List<Message> messages,string currentUsername){
           var unreadMessages = messages.Where(m => m.DateRead == null &&
            m.Recipient.UserName==currentUsername)
           .ToList();
           if(unreadMessages.Any())
           {
               foreach (var um in unreadMessages) um.DateRead = DateTime.Now;
               var rtn = await _context.SaveChangesAsync();
               if(rtn < unreadMessages.Count){
                   return -1;
               }
           }
            return 0;
        }
    }
}