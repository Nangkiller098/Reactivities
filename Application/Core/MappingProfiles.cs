using AutoMapper;
using Domain;
// using Domain.Models;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            // CreateMap<Activity, UpdateActivityDto>().ReverseMap();
        }
    }
}