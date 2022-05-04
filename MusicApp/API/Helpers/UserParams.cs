namespace API.Helpers
{
    public class UserParams:PaginationParams
    {
        public string CurrentUsername { get; set; }
        public string InstrumentType { get; set; }
        public string MinCost { get; set; }
        public string MaxCost { get; set; }
        public string OrderBy { get; set; } = "LastApdate";
    }
}