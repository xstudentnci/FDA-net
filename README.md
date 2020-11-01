# CA-1

## Developers
### Requirements
* Have installed Notepad++ from https://notepad-plus-plus.org/downloads/
* Have installed Visual Studio 2019 Community from https://visualstudio.microsoft.com/vs/community/
* Have installed Git Bash from https://git-scm.com/downloads

### Git configuration
#### Set Notepad++ as default editor instead of vi.
git config --global core.editor "'C:/Program Files (x86)/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
#### Commit as it is without end lines conversion.
git config --global core.autocrlf false  => https://stackoverflow.com/questions/1967370/git-replacing-lf-with-crlf
#### Set Visual Studio as mergetool.
Follow next link for that: https://dzone.com/articles/how-to-configure-visual-studio-as-diff-and-merge-t

### Download project
1. Create a development folder where the repository will be downloaded, i.e: c:\dev
2. cd c:\dev
3. Clone the git repository with: git clone https://github.com/xstudentnci/FDA-net.git
4. Open the solution file https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1.sln from your local folder.

### Run project
Once your solution is open in Visual Studio press F5 to run the app.

### Pages
* About: to be completed
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Views/Home/About.cshtml
* Contact: to be completed
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Views/Home/Contact.cshtml
* Mission: to be completed
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Views/Home/Mission.cshtml
* Controller for above pages:
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Controllers/HomeController.cs

* Products: basic table rendered from ajax call
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Views/Products/Index.cshtml
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Controllers/ProductsController.cs

* Products upload: basic file upload form
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Views/ProductsUpload/Index.cshtml
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Controllers/ProductsUpload.cs

### XML
#### XML Products
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/Products.xml
#### Products schema
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/ProductsSchema.xsd
#### Products XSL Transformation
https://github.com/xstudentnci/FDA-net/blob/main/WAD-CA1/ProductsTransformation.xsl
