using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser,MemberDto>()
            .ForMember(
                dest=>dest.PhotoUrl,
                opt=>{
                    opt.MapFrom(scr=>scr.Photos.FirstOrDefault(p=>p.IsMain).Url);
                }
            );
            CreateMap<Photo,PhotoDto>();
            CreateMap<MemberUpdateDtos,AppUser>();
            CreateMap<RegisterDto, AppUser>()
            .ForMember(
                dest => dest.UserName,
                opt => {
                    opt.MapFrom(src => src.Username.ToLower());
                }
            );

            CreateMap<Message,MessageDto>()
            .ForMember(
                dest => dest.SenderPhotoUrl,
                opt => opt.MapFrom(
                    src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url
                )
            )
            .ForMember(
                dest => dest.RecipientPhotoUrl,
                opt => opt.MapFrom(
                    src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url
                )
            );
        }
    }
}