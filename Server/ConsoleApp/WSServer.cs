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

        public void init()
        {           
            var server = new WebSocketServer("ws://localhost:8181");
            server.Start(socket =>
                {
                    socket.OnOpen = () =>
                        {
                            Console.WriteLine("WebSocketServer: Started!");
                            allSockets.Add(socket);
                        };
                    socket.OnClose = () =>
                        {
                            Console.WriteLine("WebSocketServer: Closed!");
                            allSockets.Remove(socket);
                        };
                    socket.OnMessage = message =>
                        {
                            Console.WriteLine(message);
                        };

                });

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

        }
    }
}
