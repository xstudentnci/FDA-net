using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;

namespace WAD_CA1.Controllers
{
    public class ProductsUpload : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("UploadFile")]
        //[DisableFormValueModelBinding]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> UploadFile()
        {
            try
            {
                if (HttpContext.Request.Form.Files[0] == null)
                {
                    return Ok("No file selected for upload.");
                }

                var filePath = Path.GetTempFileName();

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    var file = HttpContext.Request.Form.Files[0];
                    await file.CopyToAsync(stream);
                }

               using var productFileStream = System.IO.File.Open("Products.xml", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite);

                var xml1 = XDocument.Load(productFileStream, LoadOptions.None);
                var xml2 = XDocument.Load(filePath);
                ////Combine and remove duplicates
                //var combinedUnique = xml1.Descendants("AllNodes")
                //                          .Union(xml2.Descendants("AllNodes"));

                //Combine and keep duplicates
                //var combinedWithDups = xml1.Descendants("products")
                //                           .Concat(xml2.Descendants("products"));

                //combinedWithDups.First().Save("ProductsConcatenated.xml");
                //XDocument doc = new XDocument(combinedWithDups);

                //doesnt work
                //xml1.Add(xml2);
                //xml1.Save("Products2.xml");

                productFileStream.Seek(0, SeekOrigin.Begin);
                xml1.Root.Add(xml2.Root.Elements());
                xml1.Save(productFileStream);
                return Ok("All good");
            }
            catch (Exception ex)
            {
                //Just for debugging purpose at the moment
                throw;
            }
        }
    }
}
