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
        String serveradress;


        public WSServer()
        {
            this.serveradress = "ws://192.168.0.9:8181";

        }


        public WSServer(string serveradress)
        {
            this.serveradress = serveradress;
        }



        public void init()
        {           
            var server = new WebSocketServer(this.serveradress);
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
            Console.WriteLine(DateTime.Now + " [WebSocketServer] server started "+this.serveradress);

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
            Console.WriteLine(DateTime.Now + " [WebSocketServer] sent message broadcast: " + msg);

        }
    }
}
