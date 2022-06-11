using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public MessagesController(IUserRepository userRepository,IMessageRepository messageRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _messageRepository = messageRepository;
            
        }   
        [HttpGet]
         public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto){
            var username=User.GetUsername();
            if (username==createMessageDto.RecipientUsername.ToLower())
            {
                return BadRequest("Yue can`t send a message to yourself");
            }
            var sender=await _userRepository.GetUserByNameAsync(username);
            var recipient=await _userRepository.GetUserByNameAsync(createMessageDto.RecipientUsername);
            if (recipient==null)
            {
                return NotFound();
            }

            var message=new Message{
                Sender=sender,
                Recipient=recipient,
                SenderUsername=sender.UserName,
                RecipientUsername=recipient.UserName,
                Content=createMessageDto.Content,
            };
            _messageRepository.AddMessage(message);
            // if we hade a url to an individual message wh should have added the Created At Route directive
            if (await _messageRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to send message");
        }
        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery]MessageParams messageParams){
            messageParams.Username=User.GetUsername();
            var messages=await _messageRepository.GetMessagesForUser(messageParams);
            Response.AddPaginationHeader(messages.CurrentPage,messages.PageSize,messages.TotalCount,messages.TotalPages);
            return Ok(messages);
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread (string username){
            var currentUsername = User.GetUsername();
            var messageThread = await _messageRepository.GetMessageThread(currentUsername,username);
            return Ok(messageThread);
        }
        [HttpDelete]
         public async Task<ActionResult> DeleteMessage(int id){
            var username = User.GetUsername();
            var message = await _messageRepository.GetMessage(id);

            if (message == null) return NotFound();
            if (message.SenderUsername != username && message.RecipientUsername != username) return Unauthorized();
            if (message.SenderUsername == username) message.SenderDeleted = true;
            else message.RecipientDeleted = true;
            if (message.SenderDeleted && message.RecipientDeleted) _messageRepository.DeleteMessage(message);
            if (await _messageRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the message");
        }
    }
}