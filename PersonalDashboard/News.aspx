<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="News.aspx.cs" Inherits="PersonalDashboard.News" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Golem News</h1>
    <asp:GridView runat="server" ModelType="NewsItem" SelectMethod="GetGolemNews" ></asp:GridView>
    <h1>Heise News</h1>
    <asp:GridView runat="server" ModelType="NewsItem" SelectMethod="GetHeiseNews" ></asp:GridView>
    <br />
    <br />
	<!-- See: https://msdn.microsoft.com/en-us/library/bb398790.aspx -->
    <!--
    <asp:ListView runat="server" ModelType="NewsItem" SelectMethod="GetHeiseNews" >

		<LayoutTemplate>
		<div runat="server" id="newsTitle"/>
		<div runat="server" id="newsTeaser"/>
		<div runat="server" id="newsContent"/>
		</LayoutTemplate>
		
		<ItemTemplate>
		<div runat="server" >
			<asp:Label ID="NameLabel" runat="server" Text='<%#Eval("Name") %>'/>
		
		</div>
		<div runat="server" >
					<asp:Label ID="NameLabel2" runat="server" Text='<%#Eval("Name") %>'/>
		</div>
		<div runat="server" >
					<asp:Label ID="NameLabel3" runat="server" Text='<%#Eval("Name") %>'/>
		</div>
		</ItemTemplate>
	-->
	
<!--	
		<LayoutTemplate>
			<table runat="server" id="table1" >
				<tr runat="server" id="itemPlaceholder" ></tr>
		</table>
		</LayoutTemplate>
		
		<ItemTemplate>
			<tr runat="server">
			<td runat="server">
			<%-- Data-bound content. --%>
			<asp:Label ID="NameLabel" runat="server" 
			Text='<%#Eval("Name") %>' />
			</td>
			</tr>
		</ItemTemplate>
-->
		</asp:ListView>
</asp:Content>
