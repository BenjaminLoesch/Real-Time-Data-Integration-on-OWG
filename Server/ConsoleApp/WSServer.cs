using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Fleck;

namespace UdpWSBridge.ConsoleApp
{
    class WSServer
    {   
        List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>();
        private System.Net.IPAddress wsip;
        private int wsp;


        public WSServer(System.Net.IPAddress wsip, int wsp)
        {
            // TODO: Complete member initialization
            this.wsip = wsip;
            this.wsp = wsp;
        }



        public void init()
        {           
            var server = new WebSocketServer("ws://"+this.wsip+":"+this.wsp);
            
            server.Start(socket =>
                {
                    socket.OnOpen = () =>
                        {
                            Console.WriteLine(DateTime.Now+" [WebSocketServer] Client connected!");
                            allSockets.Add(socket);
                        };
                    socket.OnClose = () =>
                        {
                            Console.WriteLine(DateTime.Now + " [WebSocketServer] Client disconnected!");
                            allSockets.Remove(socket);
                        };
                    socket.OnMessage = message =>
                        {
                            Console.WriteLine(DateTime.Now + " [WebSocketServer] received message: " + message);
                        };

                });
            Console.WriteLine(DateTime.Now + " [WebSocketServer] server started "+this.wsip.ToString()+":"+this.wsp);

            /*
            string msg;
            int dir=1;
            int dirlat = 1;


            double minlng =7.600014;
            double maxlng =7.601987;

            double maxlat = 46.762925;
            double minlat=46.761726;
            */
 
        }

        public void sendPositionUpdate(PosData posdata)
        {
            string msg = "{\"id\":\"" + posdata.Id+ "\",\"Lng\":" + posdata.Lng+ ",\"Lat\":" + posdata.Lat + ",\"Elv\":" + posdata.Elv + "}";

            foreach (var socket in allSockets.ToList())
            {
                socket.Send(msg); //broadcasting
            }
            Console.WriteLine(DateTime.Now + " [WebSocketServer] sent message broadcast: \n" + msg+"\n\n");

        }
    }
}
