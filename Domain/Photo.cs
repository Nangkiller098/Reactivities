namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }

        //check for main or not to show
        public bool IsMain { get; set; }
    }
}