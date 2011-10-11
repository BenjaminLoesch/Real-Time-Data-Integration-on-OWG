using System;
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
            IPAddress wsip = IPAddress.Loopback;//Dns.GetHostAddresses(Dns.GetHostName());

            int udpp = 4051;
            IPAddress udpip = IPAddress.Loopback;//Dns.GetHostAddresses(Dns.GetHostName())[1];
            
            
            WSServer ws = new WSServer(wsip,wsp);
            UDPServer udp = new UDPServer(udpip,udpp);

            ws.init();
            udp.init(ws);

        }
    }
}
