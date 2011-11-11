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

                //parameter from console "-wsp" web-scoket port
                int wsp = 4123;
                IPAddress wsip = IPAddress.Parse("10.218.9.30");//IPAddress.Parse("10.10.5.130");

                int udpp = 4051;
                IPAddress udpip = IPAddress.Parse("10.218.9.30");//IPAddress.Parse("10.10.5.130");//IPAddress.Parse("192.168.0.1");


                WSServer ws = new WSServer(wsip, wsp);
                UDPServer udp = new UDPServer(udpip, udpp);

                ws.init();
                udp.init(ws);
           


        }
    }
}
