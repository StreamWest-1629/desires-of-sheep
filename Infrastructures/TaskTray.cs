using System;
using System.Drawing;
using System.Collections.Generic;
using System.Text;
using System.Windows.Forms;

namespace desire_of_sheep
{
    namespace Infrastructures
    {
        public class TaskTray : Form
        {
            NotifyIcon icon;

            public TaskTray()
            {
                this.ShowInTaskbar = false;
                IconInit();
            }

            private void IconInit()
            {
                this.icon = new NotifyIcon();
                this.icon.Icon = Properties.Resources.app_icon;
                this.icon.Visible = true;
                this.icon.Text = "";
            }

        }
    }
}
