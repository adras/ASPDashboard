<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="News.aspx.cs" Inherits="PersonalDashboard.News" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Golem News</h1>
    <asp:GridView runat="server" ModelType="NewsItem" SelectMethod="GetGolemNews" ></asp:GridView>
    <h1>Heise News</h1>
    <asp:GridView runat="server" ModelType="NewsItem" SelectMethod="GetHeiseNews" ></asp:GridView>
</asp:Content>
