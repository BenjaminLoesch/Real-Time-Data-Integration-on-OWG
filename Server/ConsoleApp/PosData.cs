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
        private float x=-1;

        public float X
        {
            get { return x; }
            set { x = value; }
        }
        private float y=-1;

        public float Y
        {
            get { return y; }
            set { y = value; }
        }
        private float elv=-1;

        public float Elv
        {
            get { return elv; }
            set { elv = value; }
        }
        private float timestamp=-1;

        public float Timestamp
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

        private float version;

        public float Version
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

        private float quality;

        public float Quality
        {
            get { return quality; }
            set { quality = value; }
        }

        private float quat_x;

        public float Quat_x
        {
            get { return quat_x; }
            set { quat_x = value; }
        }

        private float quat_y;

        public float Quat_y
        {
            get { return quat_y; }
            set { quat_y = value; }
        }

        private float quat_z;

        public float Quat_z
        {
            get { return quat_z; }
            set { quat_z = value; }
        }

        private float quat_w;

        public float Quat_w
        {
            get { return quat_w; }
            set { quat_w = value; }
        }
    }
}
