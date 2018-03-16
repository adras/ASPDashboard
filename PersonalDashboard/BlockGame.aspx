<%@ Page Title="Block Game" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="BlockGame.aspx.cs" Inherits="PersonalDashboard.WebForm2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <%: Scripts.Render("~/bundles/BlockGame") %>
    <br />
    <br />
    <canvas id="canvasGameArea"></canvas>
    <br />
    <br />
    <div id="textScore"></div>
</asp:Content>
