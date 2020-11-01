namespace WAD_CA1
{
    public class TableResult
    {
        public int RowCount { get; set; }
        public int Pages { get; set; }
        public string  Table{ get; set; }
        public TableResult()
        {
            RowCount = 10;
            this.Pages = 1;
        }
    }
}
