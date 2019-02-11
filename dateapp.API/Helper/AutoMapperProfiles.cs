using System.Linq;
using AutoMapper;
using dateapp.API.Models;

namespace dateapp.API.Helper
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserListModel>()
                .ForMember(dest=>dest.PhotoURL , opt => {
                    //map from, used when map from property
                    opt.MapFrom(src=> src.Photos.FirstOrDefault(v=>v.IsMain).Url);
                })
                 .ForMember(dest=>dest.Age , opt => {
                    //we dont have Age property
                    //MapFrom must map from prop
                    //ResolveUsing used when we use custom value or calc 
                    opt.ResolveUsing(d=>d.DateOfBirth.CalcAge());
                });
            CreateMap<User, UserDetailsModel>()
                .ForMember(dest=>dest.PhotoURL , opt=>{
                    opt.MapFrom(src=> src.Photos.FirstOrDefault(v=>v.IsMain).Url);
                })
                .ForMember(dest=>dest.Age , opt => {
                    //we dont have Age property
                    //MapFrom must map from prop
                    //ResolveUsing used when we use custom value or calc 
                    opt.ResolveUsing(d=>d.DateOfBirth.CalcAge());
                });
            CreateMap<Photo, PhotoModel>();
        }
    }
}