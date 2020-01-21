using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Word = Microsoft.Office.Interop.Word;
using Microsoft.Office;  
namespace ERPWebApiService
{
    public partial class TextSearch : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            object filename = @"E:\development_Sumon\POS_New\POS-new\Client\pos-client\src\assets\doc\test.docx";
            Word.Application AC = new Word.Application();
            Word.Document doc = new Word.Document();
            object readOnly = false;
            object isVisible = true;
            object missing = System.Reflection.Missing.Value;
            try
            {
                doc = AC.Documents.Open(ref filename, ref missing, ref readOnly, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref isVisible, ref isVisible, ref missing, ref missing, ref missing);
                doc.ActiveWindow.Selection.WholeStory();
                doc.ActiveWindow.Selection.Copy();
                Label1.Text = doc.Content.Text;
                doc.Close();
            }
            catch (Exception ex)
            {

            }  
        }
    }
}