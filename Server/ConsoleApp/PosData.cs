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
        private float lng=-1;

        public float Lng
        {
            get { return lng; }
            set { lng = value; }
        }
        private float lat=-1;

        public float Lat
        {
            get { return lat; }
            set { lat = value; }
        }
        private float elv=-1;

        public float Elv
        {
            get { return elv; }
            set { elv = value; }
        }
        private float yaw=-1;

        public float Yaw
        {
            get { return yaw; }
            set { yaw = value; }
        }
        private float pitch=-1;

        public float Pitch
        {
            get { return pitch; }
            set { pitch = value; }
        }
        private float roll=-1;

        public float Roll
        {
            get { return roll; }
            set { roll = value; }
        }


        private float timestamp=-1;

        public float Timestamp
        {
            get { return timestamp; }
            set { timestamp = value; }
        }

        public string ToString()
        {
            return "---- posdata -----\nID: " + this.id + " \nTimestamp: " + this.timestamp + " \nLng: " + this.lng + " \nLat: " + this.lat + " \nElv: " + this.elv + " \nYaw: " + this.yaw + " \nPitch: " + this.pitch + " \nRoll: " + this.roll;
            
        }
    }
}
