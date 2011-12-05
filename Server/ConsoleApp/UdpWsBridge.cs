﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Sockets;

namespace UdpWSBridge.ConsoleApp
{
    static class UdpWsBridge
    {
        static void Main(string[] args)
        {

            if (args.Length != 1)
            {
                Console.WriteLine("usage: argument 1: ip\n UDP-Port : 4051\nWS-Port : 4123");
                return;
            }
                //parameter from console "-wsp" web-scoket port
                int wsp = 4123;
               // IPAddress wsip = IPAddress.Loopback;//IPAddress.Parse("10.218.9.30");//IPAddress.Parse("10.10.5.130");
                IPAddress wsip = IPAddress.Parse(args[0]);

                int udpp = 4051;
               // IPAddress udpip = IPAddress.Loopback;//IPAddress.Parse("10.218.9.30");//IPAddress.Parse("10.10.5.130");
                IPAddress udpip = IPAddress.Parse(args[0]);

                WSServer ws = new WSServer(wsip, wsp);
                UDPServer udp = new UDPServer(udpip, udpp);

                ws.init();
                udp.init(ws);
           


        }
    }
}
