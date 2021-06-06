import wx
import wx.adv
import sys
sys.path.append('./../')
# import resource

ToolTip = 'test app'
TrayIcon = 'example.ico'


# コンテキストメニュー内で実行される設定を開く関数
def OpenSettings():
    print('open setting')

class TaskTray(wx.adv.TaskBarIcon):
    def __init__(self, frame:wx.Frame) -> None:
        self.frame = frame
        self.menu = wx.Menu()
        super(TaskTray, self).__init__()
        self.setIcon(TrayIcon)
        self.Bind(wx.adv.EVT_TASKBAR_LEFT_DCLICK, OpenSettings)

    # アイコンの設定
    def setIcon(self, icon):
        icon = wx.Icon(wx.Bitmap(icon))
        # self.SetIcon(icon, ToolTip)

    # タスクトレイのコンテキストメニューを初期化します
    def InitMenu(self):
        def CreateItem(menu:wx.Menu, label, func):
            item = wx.MenuItem(
                parentmenu  = menu, 
                id          = -1, 
                text        = label,
            )
            menu.Bind(wx.EVT_MENU, func, id = item.GetId)
            menu.AppendItem(item)
        
        CreateItem(self.menu, "Settings...", OpenSettings)

    def CreatePopupMenu(self):
        return self.menu

class App(wx.App):
    def OnInit(self):
        frame = wx.Frame(None)
        self.SetTopWindow(frame)
        TaskTray(frame)
        print("Started...")
        return True

if __name__ == "__main__":
    app = App(False)
    app.MainLoop()
