using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;

namespace WAD_CA1.Controllers
{
    public class ProductsUpload : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("UploadFile")]
        public IActionResult UploadFile()
        {
            try
            {
                if (HttpContext.Request.Form.Files == null ||
                    !HttpContext.Request.Form.Files.Any() ||
                    HttpContext.Request.Form.Files[0] == null)
                {
                    return BadRequest(new { type="error", message="No file selected for upload" });
                }

                var file = HttpContext.Request.Form.Files[0];
                using var formFileStream = file.OpenReadStream();
                var errorsDetected = this.ValidateXML(formFileStream);

                if (!errorsDetected.Any())
                {
                    //I am going for a replace approach rather than append new products, in this way we don't need CRUD operations in xml which is out of scope.
                    using var productFileStream = System.IO.File.Open("Products.xml", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite);
                    productFileStream.SetLength(0);
                    formFileStream.Seek(0, SeekOrigin.Begin);
                    formFileStream.CopyTo(productFileStream);

                    productFileStream.Flush();
                }
                else
                {
                    return BadRequest(new { type = "xml-validation-error", errors= errorsDetected });
                }

                return Ok("All good");
            }
            catch (Exception)
            {
                return BadRequest(new { type = "error", message = "Internal error" });
            }
        }

        private List<string> ValidateXML(Stream xmlFileStream)
        {
            var errors = new List<string>();
            var path = new Uri(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase)).LocalPath;
            var schema = new XmlSchemaSet();
            var schemaPath = Path.Combine(path, "ProductsSchema.xsd");
            schema.Add("", schemaPath);
            using var rd = XmlReader.Create(xmlFileStream);
            var doc = XDocument.Load(rd);
            doc.Validate(schema, (sender, e) => ValidationEventHandler(sender, e, errors));

            return errors;
        }

        static void ValidationEventHandler(object sender, ValidationEventArgs e, List<string> errors)
        {
            var errorMessage = $"{e.Severity}, {e.Message}";

            switch (e.Severity)
            {
                case XmlSeverityType.Error:
                    {                       
                        errors.Add(errorMessage);
                        Console.WriteLine(errorMessage);
                    };break;
                case XmlSeverityType.Warning: // I am not returning warnings as this is out of scope
                default: Console.WriteLine(errorMessage); break;
            }
        }
    }
}
