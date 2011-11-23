using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Sockets;

namespace UdpWSBridge.ConsoleApp
{
    class UDPServer
    {

        private WSServer wsserver;
        private string udpadress;
        private IPAddress ip;
        private int port;
        private IPAddress udpip;
        private int udpp;
        private WSServer ws;



        public UDPServer(IPAddress udpip, int udpp)
        {
            // TODO: Complete member initialization
            this.udpip = udpip;
            this.udpp = udpp;
        }



        public void init(WSServer wsserver)
        {
            this.wsserver = wsserver;
            string message;
            
            int recv;
            byte[] data = new byte[1024];
            IPEndPoint ipep = new IPEndPoint(this.udpip, this.udpp);

            Socket newsock = new Socket(AddressFamily.InterNetwork,
                            SocketType.Dgram, ProtocolType.Udp);

            try
            {
                newsock.Bind(ipep);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                
            }
           // Console.WriteLine("Waiting for a client...");

            IPEndPoint sender = new IPEndPoint(IPAddress.Any, 0);
            EndPoint Remote = (EndPoint)(sender);


            Console.WriteLine(DateTime.Now + " [UdpServer] server started on: " + this.udpip+":"+this.udpp);
            //string m = "[Message]\nsender=eth1\ntimestamp=231.221\n[Location]\npos=3.12312,4.12421,7.21133\nori=355,90,0\nname=ufdhfdhfd";
            while(true)
            {
                try
                {
                    data = new byte[1024];
                    recv = newsock.ReceiveFrom(data, ref Remote);

                    message = Encoding.ASCII.GetString(data, 0, recv);
                    Console.WriteLine(DateTime.Now + " [UdpServer] Message received: \n" + message + "\n\n");
                    this.parseMessage(message);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    
                }

            }
        }


        private void parseMessage(string message)
        {
           
            string[] parts = { };

            message = message.ToLower();

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

                                case "msgcounter": posdata.Msgcount = int.Parse(c[1]);
                                    break;

                                case "version": posdata.Version = float.Parse(c[1]);
                                    break;

                                case "message":
                                    if (c.Length > 1)
                                    {
                                        posdata.Message = c[1];
                                    }
                                    else
                                    {
                                        posdata.Message = "";
                                    }

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
                                    posdata.X = float.Parse(d[0]);
                                    posdata.Y = float.Parse(d[1]);
                                    posdata.Elv = float.Parse(d[2]);
                                    break;

                                case "ori":
                                    d = c[1].Split(new Char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                                    posdata.Quat_x = float.Parse(d[0]);
                                    posdata.Quat_y = float.Parse(d[1]);
                                    posdata.Quat_z = float.Parse(d[2]);
                                    posdata.Quat_w = float.Parse(d[3]);
                                    break;

                                case "quality":
                                    posdata.Quality = float.Parse(c[1]);
                                    break;
                                default:
                                    break;
                            }
                        }
                        break;
                }
            }

            this.wsserver.sendPositionUpdate(posdata);
            


        }

        public IPAddress ipadress { get; set; }
    }
}



