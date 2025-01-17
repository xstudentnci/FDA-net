﻿using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;

namespace WAD_CA1.Controllers
{

    public class ProductsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetTable()
        {
            var rawHtml = ApplyXSLTransformation();

            return Ok(rawHtml);
        }

        private static string ApplyXSLTransformation()
        {
            using var myXmlFile = System.IO.File.Open("Products.xml", FileMode.Open, FileAccess.Read, FileShare.Read);
            XPathDocument myXPathDoc = new XPathDocument(myXmlFile);
            XslTransform myXslTrans = new XslTransform();
            using var styleSheetFile = System.IO.File.Open("ProductsTransformation.xsl", FileMode.Open);
            XmlTextReader stylesheetReader = new XmlTextReader(styleSheetFile);
            myXslTrans.Load(stylesheetReader);

            StringBuilder resultString = new StringBuilder();
            using var xmlWriter = new XmlTextWriter(new StringWriter(resultString));

            myXslTrans.Transform(myXPathDoc, null, xmlWriter);

            return resultString.ToString();
        }

    }
}
