using Application.Core;

namespace Application.Activities
{
    public class ActivityParams : PagingParam
    {
        public bool IsGoing { get; set; }
        public bool IsHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}