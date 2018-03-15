<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Tetris.aspx.cs" Inherits="PersonalDashboard.WebForm2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <%: Scripts.Render("~/bundles/Tetris") %>
<br />
<br />
    <canvas id="canvasGameArea"></canvas>
<br />
<br />
<div id="textDebug1"></div>
<div id="textDebug2"></div>
<div id="textDebug3"></div>
</asp:Content>
