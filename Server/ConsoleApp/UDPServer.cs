using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace UdpWSBridge.ConsoleApp
{
    class UDPServer
    {

        private WSServer wsserver;
        public void init(WSServer wsserver)
        {
            this.wsserver = wsserver;
            string message;
            
            int recv;
            byte[] data = new byte[1024];
            IPEndPoint ipep = new IPEndPoint(IPAddress.Any, 31415);

            Socket newsock = new Socket(AddressFamily.InterNetwork,
                            SocketType.Dgram, ProtocolType.Udp);

            newsock.Bind(ipep);
            Console.WriteLine("Waiting for a client...");

            IPEndPoint sender = new IPEndPoint(IPAddress.Any, 0);
            EndPoint Remote = (EndPoint)(sender);
           

            /*
            string welcome = "Welcome to my test server";   //sending of data back to server
            data = Encoding.ASCII.GetBytes(welcome);
            newsock.SendTo(data, data.Length, SocketFlags.None, Remote);
             */
            //string m = "\x00\x01\x00p[Message]\nsender=eth1\ntimestamp=231.221\n[Location]\npos=3.12312,4.12421,7.21133\nori=355,90,0\nname=ufdhfdhfd";
            while(true)
            {
               data = new byte[1024];
               recv = newsock.ReceiveFrom(data, ref Remote);
             
               message = Encoding.ASCII.GetString(data, 0, recv);
               Console.WriteLine(message);
               this.parseMessage(message);

            }
        }


        private void parseMessage(string message)
        {
            //check preamble
            var a = message.IndexOf("\x00\x01\x00");
            string[] parts = { };

            message = message.ToLower();
            if (a > -1)
            {

                PosData posdata = new PosData();
                parts = message.Split(new String[] { "[" }, StringSplitOptions.RemoveEmptyEntries);

                string[] d = { };
                foreach (string p in parts)
                {

                    string[] b = p.Split(new String[] { "\n" }, StringSplitOptions.RemoveEmptyEntries);

                    switch (b[0])
                    {
                        case "message]": //message part found
                            for (int i = 1; i < b.Length; i++)
                            {
                                string[] c = b[i].Split(new Char[] { '=' }, StringSplitOptions.RemoveEmptyEntries);
                                switch (c[0])
                                {
                                    case "sender": posdata.Id = c[1];
                                        break;
                                    case "timestamp": posdata.Timestamp = float.Parse(c[1]);
                                        break;
                                    default:
                                        break;
                                }
                            }
                            break;

                        case "location]": //message location found  
                            for (int i = 1; i < b.Length; i++)
                            {
                                string[] c = b[i].Split(new Char[] { '=' }, StringSplitOptions.RemoveEmptyEntries);
                                switch (c[0])
                                {

                                    case "pos":
                                        d = c[1].Split(new Char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                                        posdata.Lng = float.Parse(d[0]);
                                        posdata.Lat = float.Parse(d[1]);
                                        posdata.Elv = float.Parse(d[2]);
                                        break;
                                    case "ori":
                                        d = c[1].Split(new Char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                                        posdata.Yaw = float.Parse(d[0]);
                                        posdata.Pitch = float.Parse(d[1]);
                                        posdata.Roll = float.Parse(d[2]);
                                        break;
                                    default:
                                        break;
                                }
                            }
                            break;
                    }
                }

                this.wsserver.sendPositionUpdate(posdata);
                //Console.WriteLine(posdata.ToString());
            }


        }
    }
}



