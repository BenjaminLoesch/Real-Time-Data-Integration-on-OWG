using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UdpWSBridge.ConsoleApp
{
    static class UdpWsBridge
    {
        static void Main(string[] args)
        {
            WSServer ws = new WSServer();
            UDPServer udp = new UDPServer();

            ws.init();
            udp.init(ws);

        }
    }
}
