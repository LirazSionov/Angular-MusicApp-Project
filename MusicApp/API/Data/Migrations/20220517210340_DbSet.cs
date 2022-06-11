using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class DbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MessageMessage");

            migrationBuilder.AddColumn<bool>(
                name: "SenderDeleted",
                table: "Message",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SenderDeleted",
                table: "Message");

            migrationBuilder.CreateTable(
                name: "MessageMessage",
                columns: table => new
                {
                    MessagesRecievedId = table.Column<int>(type: "INTEGER", nullable: false),
                    MessagesSentId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageMessage", x => new { x.MessagesRecievedId, x.MessagesSentId });
                    table.ForeignKey(
                        name: "FK_MessageMessage_Message_MessagesRecievedId",
                        column: x => x.MessagesRecievedId,
                        principalTable: "Message",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MessageMessage_Message_MessagesSentId",
                        column: x => x.MessagesSentId,
                        principalTable: "Message",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MessageMessage_MessagesSentId",
                table: "MessageMessage",
                column: "MessagesSentId");
        }
    }
}
