using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UdpWSBridge.ConsoleApp
{
    class PosData
    {
        private string id;

        public string Id
        {
            get { return id; }
            set { id = value; }
        }
        private double x=-1;

        public double X
        {
            get { return x; }
            set { x = value; }
        }
        private double y=-1;

        public double Y
        {
            get { return y; }
            set { y = value; }
        }
        private double elv=-1;

        public double Elv
        {
            get { return elv; }
            set { elv = value; }
        }
        private double timestamp=-1;

        public double Timestamp
        {
            get { return timestamp; }
            set { timestamp = value; }
        }

        public override string ToString()
        {
            return "---- posdata -----\nID: " + this.id + " \nTimestamp: " + this.timestamp + " \nX: " + this.x + " \nY: " + this.y + " \nElv: " + this.elv + " \nQx: " + this.quat_x + " \nQy: " + this.quat_y + " \nQz: " + this.quat_z + " \nQw: " + this.quat_w +
                "\nMsgCount: " + this.msgcount + "\nQuality: " + this.quality + "\nMessage :" + this.message;
            
        }

        private int msgcount;

        public int Msgcount
        {
            get { return msgcount; }
            set { msgcount = value; }
        }

        private double version;

        public double Version
        {
            get { return version; }
            set { version = value; }
        }

        private string message;

        public string Message
        {
            get { return message; }
            set { message = value; }
        }

        private double quality;

        public double Quality
        {
            get { return quality; }
            set { quality = value; }
        }

        private double quat_x;

        public double Quat_x
        {
            get { return quat_x; }
            set { quat_x = value; }
        }

        private double quat_y;

        public double Quat_y
        {
            get { return quat_y; }
            set { quat_y = value; }
        }

        private double quat_z;

        public double Quat_z
        {
            get { return quat_z; }
            set { quat_z = value; }
        }

        private double quat_w;

        public double Quat_w
        {
            get { return quat_w; }
            set { quat_w = value; }
        }
    }
}
