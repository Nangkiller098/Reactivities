using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        //many to many
        public ICollection<ActivityAttendee> Activities { get; set; }

        //one to many
        public ICollection<Photo> Photos { get; set; }
    }
}