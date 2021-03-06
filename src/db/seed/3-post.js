var postData = [
  {
    body:
      "\n\nIn spring boot we have trace endpoint.  Is it possible to redirect these entries into file ?  I was trying to find this in internet, but no effects.\n    ",
    title: "Spring-boot actuator - trace to file",
    id: 1,
    PostTypeId: 1,
    bounty: 0.4488681114716133,
    UserId: 82,
    viewCount: 7,
    upvoteCount: 8,
    comments: 1
  },
  {
    body:
      "\nFirst you can Implement your own class from TraceRepository. Then save it to a file with Logger. You can find a production ready sample here which is a way to save actuator to file per any request.\n    ",
    id: 2,
    PostTypeId: 2,
    PostId: 1,
    bounty: 0.4488681114716133,
    UserId: 36,
    upvoteCount: 33
  },
  {
    body:
      '\n\nIn an accounting WPF app we have a number of public DataTables that reload data once a tab is opened. This works great locally as the reports just refer to those tables..\n\nFor some more complex reports we have just set up a Web Service to run them and return a PDF... To make it easier I thought of loading these DataTables into a DataSet and then extracting them at the server end. This works perfectly the first time it\'s run, but then (as best as I can work out so far) it\'s sending the incorrect (last loaded) data for subsequent reports. Locally it still works as it should but the DataTables we are sending in the DataSet appear to not be updating. Have tried to remove the tables and re-add them again, but that just throws a \'object reference not set\' the first time a DataRow is selected from a DataTable at the server.\n\nMust be something very basic I have been missing :-(\n\nAny ideas?\n\nThanks\n\nPrivate Async Sub RunProfitAndLossOnServer(sender As Object, e As RoutedEventArgs)\n    Try\n        Dim StartDateTB As DateTBx = ReportBalanceSheet_Grid.FindName("BalanceSheet_StartDateTB")\n        Dim EndDateTB As DateTBx = ReportBalanceSheet_Grid.FindName("BalanceSheet_EndDateTB")\n\n        ReportStartDate = StartDateTB.Value\n        ReportEndDate = EndDateTB.Value\n        ReportDate = Today\n        ReportName = "Profit and Loss Report"\n        PaperLandscape = False\n        ReportFontSize = 8\n        PopupModals_ReportGenerator()\n        If ReportGeneratorRun = True Then\n\n            Dim vPDF() As Byte = Nothing\n            \'Determine if the Export Dataset has already been created\n            If ExportDS Is Nothing Then\n                ExportDS = New DataSet\n                VariablesDT = New DataTable\n                With VariablesDT.Columns\n                    .Add("Current_HOA_Name", GetType(String))\n                    .Add("Current_HOA_ID", GetType(Integer))\n                    .Add("ReportName", GetType(String))\n                    .Add("ReportFontSize", GetType(Integer))\n                    .Add("ReportStartDate", GetType(Date))\n                    .Add("ReportEndDate", GetType(Date))\n                    .Add("User_InternationalDate", GetType(Integer))\n                    .Add("PaperSize", GetType(String))\n                    .Add("PaperLandscape", GetType(Boolean))\n                    .Add("Reports_IsSplitGL", GetType(Boolean))\n                    .Add("Form_ID", GetType(Integer))\n                End With\n                With VariablesDT.Rows\n                    .Add(Current_HOA_Name, Current_HOA_ID, ReportName, ReportFontSize, ReportStartDate, ReportEndDate, User_InternationalDate, PaperSize, PaperLandscape, False, Form_ID)\n                End With\n                VariablesDT.TableName = "VariablesDT"\n                ExportDS.Tables.Add(VariablesDT)\n                ResIncomeDT.TableName = "ResIncomeDT"\n                ExportDS.Tables.Add(ResIncomeDT)\n                ResIncNomDT.TableName = "ResIncNomDT"\n                ExportDS.Tables.Add(ResIncNomDT)\n                ResExpensesDT.TableName = "ResExpensesDT"\n                ExportDS.Tables.Add(ResExpensesDT)\n                ResExpNomDT.TableName = "ResExpNomDT"\n                ExportDS.Tables.Add(ResExpNomDT)\n                RevenueDT.TableName = "RevenueDT"\n                ExportDS.Tables.Add(RevenueDT)\n                ExpensesDT.TableName = "ExpensesDT"\n                ExportDS.Tables.Add(ExpensesDT)\n                RevenueNomDT.TableName = "RevenueNomDT"\n                ExportDS.Tables.Add(RevenueNomDT)\n                ExpensesNomDT.TableName = "ExpensesNomDT"\n                ExportDS.Tables.Add(ExpensesNomDT)\n            Else\n\n                ExportDS.Tables.Remove("ResIncomeDT")\n                ExportDS.Tables.Remove("ResIncNomDT")\n                ExportDS.Tables.Remove("ResExpensesDT")\n                ExportDS.Tables.Remove("ResExpNomDT")\n                ExportDS.Tables.Remove("RevenueDT")\n                ExportDS.Tables.Remove("ExpensesDT")\n                ExportDS.Tables.Remove("RevenueNomDT")\n                ExportDS.Tables.Remove("ExpensesNomDT")\n\n                ExportDS.Tables.Add(ResIncomeDT)\n                ExportDS.Tables.Add(ResIncNomDT)\n                ExportDS.Tables.Add(ResExpensesDT)\n                ExportDS.Tables.Add(ResExpNomDT)\n                ExportDS.Tables.Add(RevenueDT)\n                ExportDS.Tables.Add(ExpensesDT)\n                ExportDS.Tables.Add(RevenueNomDT)\n                ExportDS.Tables.Add(ExpensesNomDT)\n\n                ExportDS.Tables.Remove("VariablesDT")\n\n                For Each row As DataRow In VariablesDT.Rows\n                    row("Current_HOA_Name") = Current_HOA_Name\n                    row("current_HOA_ID") = Current_HOA_ID\n                    row("ReportFontSize") = ReportFontSize\n                    row("User_InternationalDate") = User_InternationalDate\n                    row("PaperSize") = PaperSize\n                    row("PaperLandscape") = PaperLandscape\n                    row("Reports_IsSplitGL") = False\n                    row("ReportStartDate") = ReportStartDate\n                    row("ReportEndDate") = ReportEndDate\n                    row("ReportName") = ReportName\n                    row("Form_ID") = Form_ID\n                Next\n\n\n                ExportDS.Tables.Add(VariablesDT)\n\n            End If\n\n            Dim vImage As New LoadingImage\n                LoadingStarted("Uploading to xSoftware... Please wait...", vImage)\n                Await Task.Run(Sub()\n                                   Using vService As New Service5Client\n                                       vPDF = vService.ReturnProfitAndLossSheet(ExportDS)\n                                   End Using\n                               End Sub)\n\n                LoadingCompleted("File uploaded to xSoftware...", "File was uploaded and PDF returned...", vImage)\n\n                Dim vFile As String = ByteToFilePath(vPDF)\n                If System.IO.File.Exists(vFile) Then\n                    Dim P As New Process\n                    With P\n                        .StartInfo.FileName = vFile\n                        .StartInfo.Verb = "Open"\n                        .Start()\n                    End With\n                Else\n                    AppBoxError("The file path for the PDF is not valid!")\n                End If\n\n\n            End If\n    Catch ex As Exception\n        EmailError(ex)\n    End Try\nEnd Sub\n\n\nThrows an error at the server end if we remove and add the datatables back to the DataSet\n\nDim RevenueData() As DataRow = RevenueDT.Select("FormID = " & Form_ID, "Position")\n        Dim ExpenseData() As DataRow = ExpensesDT.Select("FormID = " & Form_ID, "Position")\n        Dim RevenueNomData() As DataRow = RevenueNomDT.Select("FormID = " & Form_ID, "Position")\n        Dim ExpenseNomData() As DataRow = ExpensesNomDT.Select("FormID = " & Form_ID, "Position")\n\n    ',
    title: "Updating DataTable inside as DataSet",
    id: 3,
    PostTypeId: 1,
    bounty: 0.0849585046892265,
    UserId: 29,
    viewCount: 5,
    upvoteCount: 17,
    comments: 1
  },
  {
    body:
      '\nIt looks like the answer is\n\n\nRemove the DataTables from the DataSet and add them again (which got us part of the way there)\nName the DataTables again!\n\nExportDS.Tables.Remove("ResIncomeDT")\n            ExportDS.Tables.Remove("ResIncNomDT")\n            ExportDS.Tables.Remove("ResExpensesDT")\n            ExportDS.Tables.Remove("ResExpNomDT")\n            ExportDS.Tables.Remove("RevenueDT")\n            ExportDS.Tables.Remove("ExpensesDT")\n            ExportDS.Tables.Remove("RevenueNomDT")\n            ExportDS.Tables.Remove("ExpensesNomDT")\n            ExportDS.Tables.Remove("VariablesDT")   \n\n\n VariablesDT.TableName = "VariablesDT"\n            ExportDS.Tables.Add(VariablesDT)\n            ResIncomeDT.TableName = "ResIncomeDT"\n            ExportDS.Tables.Add(ResIncomeDT)\n            ResIncNomDT.TableName = "ResIncNomDT"\n            ExportDS.Tables.Add(ResIncNomDT)\n            ResExpensesDT.TableName = "ResExpensesDT"\n            ExportDS.Tables.Add(ResExpensesDT)\n            ResExpNomDT.TableName = "ResExpNomDT"\n            ExportDS.Tables.Add(ResExpNomDT)\n            RevenueDT.TableName = "RevenueDT"\n            ExportDS.Tables.Add(RevenueDT)\n            ExpensesDT.TableName = "ExpensesDT"\n            ExportDS.Tables.Add(ExpensesDT)\n            RevenueNomDT.TableName = "RevenueNomDT"\n            ExportDS.Tables.Add(RevenueNomDT)\n            ExpensesNomDT.TableName = "ExpensesNomDT"\n            ExportDS.Tables.Add(ExpensesNomDT)\n\n\n\nNow it appears to be working correctly :-)\n    ',
    id: 4,
    PostTypeId: 2,
    PostId: 3,
    bounty: 0.0849585046892265,
    UserId: 7,
    upvoteCount: 24
  },
  {
    body:
      '\n\nI have a comma separated string that needs to be split into two dimentional array. I\'m creating that array like this:\n\nString str = "-,-,-,-,-,-,-,-,-,0,0,0,0,1,1,1,2,2,2,2,3,3,-,-,-,-,-,-,-,-,-,-";\nString [] arr = str.split(",");\nString [][] 2dArr = new String[8][4];\n\nint j = 0;\nint z = 0;\nfor(int i=0; i!=32; i++){\n    Log.i("loop vars", String.valueOf(i)+" "+String.valueOf(j)+" "+String.valueOf(z));\n    2dArr[z][j] = arr[i];\n    j++;\n    z++;\n    if(j==4){j=0;}\n    if(z==8){z=0;}\n\n}\n\n\nBut when I print it:\n\nfor (String [] a : 2dArr) {\n    Log.i("Array in 2dArr", Arrays.toString(a));\n}\n\n\nThe array looks like this: \n\n[-, null, null, null]\n[null, -, null, null]\n[null, null, -, null]\n[null, null, null, -]\n[-, null, null, null]\n[null, -, null, null]\n[null, null, -, null]\n[null, null, null, -]\n\n\nWhat am I doing wrong? How to fix this?\n    ',
    title: "Two dimentional array not initializing properly in Java",
    id: 5,
    PostTypeId: 1,
    bounty: 0.9932388657395819,
    UserId: 46,
    viewCount: 5,
    upvoteCount: 22,
    comments: 3
  },
  {
    body:
      '\nThe issue that you have is in here:\n\nfor(int i=0; i!=32; i++){\n    Log.i("loop vars", String.valueOf(i)+" "+String.valueOf(j)+" "+String.valueOf(z));\n    2dArr[z][j] = arr[i];\n    j++;\n    z++;\n    if(j==4){j=0;}\n    if(z==8){z=0;}\n}\n\n\nYou\'re incrementing both j and z, they get initialized to 0 and every loop you will incrementing this value by 1. That is why your output is coming out diagonally.\n\nWhat you want to be doing is incrementing z every time, and once you get to the end of your row, increment j.\n\nUsing your array initialization as an example String [][] 2dArr = new String[8][4];\n\nfor(int i = 0; i < 8; i++) {\n    for(int j = 0; j < 4; j++) {\n        // add element into the column\n    }\n    // inserted into the last column, now we will update the row and continue\n}\n\n\nEDIT: I recommend not using 8 and 4 as hard coded values here, but actually getting the length of the array instead. But since it seems you are a beginner I used these hardcoded to make the example more clear.\n    ',
    id: 6,
    PostTypeId: 2,
    PostId: 5,
    bounty: 0.9932388657395819,
    UserId: 75,
    upvoteCount: 9
  },
  {
    body:
      '\nYou\'re changing the row and column with every single iteration of the for loop. You only want to change the row when you reach the end of the columns for that row.\n\nRemove the z++ you currently have, as well as the if (z==8) part because z will never get that high in this case, and change the if (j==4) part to if(j == 4) { j=0; z++; }\n\nfor (int i = 0; i < 32; i++) {\n    Log.i("loop vars", String.valueOf(i) + " " + String.valueOf(j) + " " + String.valueOf(z));\n    2dArr[z][j] = arr[i];\n    j++;\n    if (j == 4) {\n        j = 0;\n        z++;\n    }\n}\n\n    ',
    id: 7,
    PostTypeId: 2,
    PostId: 5,
    bounty: 0.9932388657395819,
    UserId: 77,
    upvoteCount: 18
  },
  {
    body:
      "\nYou can simply do :\n\n int count = 0;\n for(int i = 0; i < 8, i++){\n     for(int j = 0; i < 4, j++){\n          2dArr[i][j] = arr[count];\n          count++; \n       }\n  }\n\n\nAnd then simply printout the 2d array with similar for loop shown above.\n    ",
    id: 8,
    PostTypeId: 2,
    PostId: 5,
    bounty: 0.9932388657395819,
    UserId: 41,
    upvoteCount: 11
  },
  {
    body:
      "\n\nI'm creating a drum machine based on a circle and need a radar-like line to rotate at a speed modulated by the tempo, with a period equal to the beats per measure. This way it rotates at speed, and completes a revolution at the equivalent duration of one measure. \n\nI'm having a hard time modeling this algebraically. From what I've figured out: \n\nseconds per  beat = 60secs/bpm \n\n 60secs/120bpm = .5spb \n\n\nSpb * bbpm (beats per measure) yields spm (seconds per measure). \n\n .5bps * 4bbpm = 2spm\n\n\nThis is where I'm stuck. I know that in 2 seconds the line needs to have turned 360 degrees in order to complete a four beat measure. I'm having a hard time modelling this much less committing it to code.\n\nWhat I've started to guess at is to divide the framerate by the spm to yield frames per second per measure. However I've tried to divide that by 360 to determine the amount of degrees per frame per second per measure but when compared to a true metronome my tick arm is inaccurate.\n\nAny insights would be appreciated.\n\nMy code:\n\nimport pygame\nfrom pygame.locals import *\nimport math\n\nSIZE = 800, 800\npygame.init()\nscreen = pygame.display.set_mode(SIZE)\nclock = pygame.time.Clock()\nframerate = 40\ndone = False\nbpm = int(input(\"Enter a BPM: \")) #beats per minute\nbbpm = int(input(\"How many Beats Per Measure?: \")) #beats per measure\nspb = (60/bpm)\nspm = spb*bbpm #speed per measure; a measure is made every x seconds\nframes = (framerate/spm) \nrev = 360/frames # degrees per frame\ndeg = 0\nsecs = 0\n\nwhile not done:\n    screen.fill(0)\n    for e in pygame.event.get():\n        if e.type == QUIT or (e.type == KEYDOWN and e.key == K_ESCAPE):\n            done = True\n            break\n\n    line = (400,400)\n    line_len = 400\n    x = line[0] + math.cos(math.radians(deg)) * line_len\n    y = line[1] + math.sin(math.radians(deg)) * line_len\n\n    # then render the line ->(x,y)\n    pygame.draw.line(screen, Color(\"red\"), line, (x,y), 1)\n    pygame.display.flip()\n    print(secs)\n    print(deg)\n    deg+=rev\n    secs+= 1\n    clock.tick(framerate)\n\n    ",
    title: "Rotating a line according to BPM and Beats per Measure",
    id: 9,
    PostTypeId: 1,
    bounty: 0.1463377808381996,
    UserId: 15,
    viewCount: 1,
    upvoteCount: 36,
    comments: 1
  },
  {
    body:
      '\n1) In motion rendering, never rely on hard-coded framerate or any constant speed per frame. Measure time delta since some reference position (e.g. in this case since last turn or init) and calculate current position according to the time delta. Even with vsync on you may miss some frames and framerate does not always equal to 60.\n\n2) Don\'t sync rendering with delays based on supposed framerate, use instead hardware vsync (in this case using pygame.display.set_mode(..., pygame.HWSURFACE | pygame.DOUBLEBUF))\n\nYour measure caclulation seems correct. There is no need in degrees to convert revolutions to radians.\n\nCorrected example:\n\nimport pygame\nfrom pygame.locals import *\nimport math\n\nSIZE = 800, 800\npygame.init()\nscreen = pygame.display.set_mode(SIZE, pygame.HWSURFACE | pygame.DOUBLEBUF)\ndone = False\nbpm = 120# int(input("Enter a BPM: ")) #beats per minute\nbbpm = 4# int(input("How many Beats Per Measure?: ")) #beats per measure\nspm = bbpm*60/bpm #seconds per measure; a measure is made every x seconds\nturnsPerMs = 1/(1000*spm) #turns per millisecond\nstartTime = pygame.time.get_ticks()\ncolor = Color("red")\nlineStart = (400,400)\nline_len = 400\n\nwhile not done:\n    for e in pygame.event.get():\n        if e.type == QUIT or (e.type == KEYDOWN and e.key == K_ESCAPE):\n            done = True\n            break   \n\n    screen.fill(0)\n    pygame.draw.circle(screen, color, lineStart, line_len, 2)\n\n    timeDelta = pygame.time.get_ticks() - startTime\n    revDelta = timeDelta*turnsPerMs;\n    deltaRadian = revDelta*2*math.pi;\n    x = lineStart[0] + math.cos(deltaRadian) * line_len\n    y = lineStart[1] + math.sin(deltaRadian) * line_len\n\n    # then render the line ->(x,y)\n    pygame.draw.line(screen, color, lineStart, (x,y), 1)\n    pygame.display.flip()\n\n    ',
    id: 10,
    PostTypeId: 2,
    PostId: 9,
    bounty: 0.1463377808381996,
    UserId: 72,
    upvoteCount: 5
  },
  {
    body:
      '\n\nI need to figure out a way to add information from sibling pages to my template file\n\nHere is an image of the file structure (the red items are the siblings whos info I need to access inside my template):\n\n\n\nHere is the tpl file code that I am using:\n\n[[+total:isequalto=`1`:then=`<div class="equalHeightListItem full_width[[+idx:isequalto=`1`:then=` column-last`]]">`:else=``]][[+total:isequalto=`2`:then=`<div class="equalHeightListItem one_half[[+idx:isequalto=`2`:then=` column-last`]]">`:else=``]][[+total:isequalto=`3`:then=`<div class="equalHeightListItem one_third[[+idx:isequalto=`3`:then=` column-last`]]">`:else=``]][[+total:isequalto=`4`:then=`<div class="equalHeightListItem one_half[[+idx:isequalto=`2`:then=` column-last`]][[+idx:isequalto=`4`:then=` column-last`]]">`:else=``]]\n    <figure class="projectImg bwWrapper icon-box7">\n        <a href="[[~[[+id]]]]">\n            <div class="operations productImage" style="max-width: 100%; background-image: url(\'[[+tv.products.category.img]]\')"></div>\n        </a>\n        <div class="projectDesc equalHeightListItemInner operations">\n            <h4><a href="[[~[[+id]]]]">[[+menutitle:default=`[[+pagetitle]]`]]</a></h4>\n            <p>[[+introtext]]</p>\n\n            <div><a href="[[~[[+id]]]]" class="magicmore corpLink">Read More</a></div>\n\n            <!-- I need to add sibling info here -->\n\n        </div>                \n    </figure>\n</div>\n\n\nAny help is greatly appreciated.\n    ',
    title: "MODX - Getting &quot;pagetitle&quot; and other info from siblings",
    id: 11,
    PostTypeId: 1,
    bounty: 0.8152739482639266,
    UserId: 86,
    viewCount: 3,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      "\nI use pdoResources (which similar to getResources, but faster). Place this code in instead <!-- I need to add sibling info here --> and this is would help.\n\n[[pdoResources?\n    &parents=`[[+id]]`\n    &depth=`1`\n    &tpl=`your_sibling_row_tpl`\n]]\n\n    ",
    id: 12,
    PostTypeId: 2,
    PostId: 11,
    bounty: 0.8152739482639266,
    UserId: 78,
    upvoteCount: 35
  },
  {
    body:
      '\n\nI\'m trying to whitelist characters for filenames and prevent path manipulation.  We take a filename returned from the frontend (i know.) and parse it to determine if it\'s in a specified folder.  As such we need to make sure the user isn\'t passing in a file that could escape out of the specified folder.  This means our case for a valid filename is:\n\n\nAlphanumeric\nCan include single slashes of either direction\nCan include single dots but not pairs.\n\n\nSo "APP-TEST-file.20161115.1" is valid but "/../../test//\\" needs to have some characters removed prior to checking the filesystem.\n\nHere\'s the regex I\'ve got now, unfortunately it\'s removing too much.\n\npublic static String validateFilePath(String fileName) {\n    return fileName.replaceAll("[^A-Za-z0-9]+[(\\\\.\\\\/)\\\\+2]", "");\n}\n\n\nSuch that "APP-TEST-file.20161115.1" is becoming  "APP-TEST-file0161115.1"\n\nAny help would be appriciated.\n    ',
    title:
      "Regex that removes all non-alphanumeric, single periods, and single slashes",
    id: 13,
    PostTypeId: 1,
    bounty: 0.16547360346665618,
    UserId: 11,
    viewCount: 5,
    upvoteCount: 11,
    comments: 1
  },
  {
    body:
      '\nDo you want something like this? (I am not clear about what you want!)\n\nString filename = "APP-TEST-file.20161115.1";\n// replace two consecutive dots with a single dot\nfilename = filename.replaceAll("\\\\.+", ".");\n// replace two consecutive forward slash with a single forward slash\nfilename = filename.replaceAll("/+", "/");\n// replace two consecutive baskslash with a backslash\nfilename = filename.replaceAll("\\\\\\\\+", "\\\\\\\\");\n// allow alphanumeric characters, dots and both type of slashes\nfilename = filename.replaceAll("[^A-Za-z0-9./\\\\\\\\]+", "");\nSystem.out.println(filename);\n\n\nIt prints:\n\nAPPTESTfile.20161115.1\n\n\nIf filename="/../../test//\\\\", then it prints - /././test/\\.\n    ',
    id: 14,
    PostTypeId: 2,
    PostId: 13,
    bounty: 0.16547360346665618,
    UserId: 72,
    upvoteCount: 22
  },
  {
    body:
      "\n\nExcuses for the bad title but I couldn't think of something good and concise..\n\nAnyway I have a webservice which provides some standard crud operations on some data. This webservice is mainly consumed by other software. The other software runs on some smallish linux devices. These devices will continue to increase as the lifetime of the product increases. \n\nSince I want the entire product to be plug and play and I want to be able to send my customers new devices which will be able to authenticate automatically and who don't have to be configured in any way by my customers at all. \n\nI could achieve something like that with just a static api key but really If there is a leak even once the entire system is compromised...\n\nThe next idea I had would be to automatically generate a new api-key every week and send it the existing clients and I would just have to put this api-key into the hardware I would send my customers. But this has 2 issues. Some devices might not be available for more than 1 week so it could miss an api-key update. \nNew devices might not be connected for 1 week. \n\nI am thinking that maybe I could generate api keys based on some specific datetime each week so I have an algorithm on the client and server that generate the key and use that. But I fear that this might be reverse engineered in some way.\n\nI am close to a total beginner in security so any help would be appreciated!\n\nMy server software stack is c# and most of my clients will be python but other languages are possible.\n    ",
    title: "Authenticate list of growing devices forever",
    id: 15,
    PostTypeId: 1,
    bounty: 0.8995703277570699,
    UserId: 70,
    viewCount: 4,
    upvoteCount: 29,
    comments: 0
  },
  {
    body:
      "\n\nUpdate after making changes:\n\n/app/index.js:27\n2016-12-07T16:03:32.984832+00:00 app[web.1]:   liveQuery: {\n2016-12-07T16:03:32.984833+00:00 app[web.1]:   ^^^^^^^^^\n2016-12-07T16:03:32.984838+00:00 app[web.1]: SyntaxError: Unexpected identifier\n2016-12-07T16:03:32.984839+00:00 app[web.1]:     at Object.exports.runInThisContext (vm.js:76:16)\n2016-12-07T16:03:32.984839+00:00 app[web.1]:     at Module._compile (module.js:542:28)\n2016-12-07T16:03:32.984840+00:00 app[web.1]:     at Object.Module._extensions..js (module.js:579:10)\n2016-12-07T16:03:32.984840+00:00 app[web.1]:     at Module.load (module.js:487:32)\n2016-12-07T16:03:32.984840+00:00 app[web.1]:     at tryModuleLoad (module.js:446:12)\n2016-12-07T16:03:32.984841+00:00 app[web.1]:     at Function.Module._load (module.js:438:3)\n2016-12-07T16:03:32.984842+00:00 app[web.1]:     at Module.runMain (module.js:604:10)\n2016-12-07T16:03:32.984842+00:00 app[web.1]:     at run (bootstrap_node.js:394:7)\n2016-12-07T16:03:32.984842+00:00 app[web.1]:     at startup (bootstrap_node.js:149:9)\n2016-12-07T16:03:32.984843+00:00 app[web.1]:     at bootstrap_node.js:509:3\n2016-12-07T16:03:32.991077+00:00 app[web.1]: \n2016-12-07T16:03:32.998460+00:00 app[web.1]: npm ERR! Linux 3.13.0-105-generic\n2016-12-07T16:03:32.998644+00:00 app[web.1]: npm ERR! argv \"/app/.heroku/node/bin/node\" \"/app/.heroku/node/bin/npm\" \"start\"\n2016-12-07T16:03:32.998784+00:00 app[web.1]: npm ERR! node v6.9.1\n2016-12-07T16:03:32.998903+00:00 app[web.1]: npm ERR! npm  v3.10.8\n2016-12-07T16:03:32.999025+00:00 app[web.1]: npm ERR! code ELIFECYCLE\n2016-12-07T16:03:32.999126+00:00 app[web.1]: npm ERR! parse-server-example@1.4.0 start: `node index.js`\n2016-12-07T16:03:32.999210+00:00 app[web.1]: npm ERR! Exit status 1\n2016-12-07T16:03:32.999307+00:00 app[web.1]: npm ERR! \n2016-12-07T16:03:32.999390+00:00 app[web.1]: npm ERR! Failed at the parse-server-example@1.4.0 start script 'node index.js'.\n\n\nHere is the index.js\n\n    // Example express application adding the parse-server module to expose Parse\n// compatible API routes.\n\nvar express = require('express');\nvar ParseServer = require('parse-server').ParseServer;\nvar path = require('path');\n\nvar databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;\nvar S3Adapter = require('parse-server').S3Adapter;\nif (!databaseUri) {\n  console.log('DATABASE_URI not specified, falling back to localhost.');\n}\n\nvar api = new ParseServer({\n  databaseURI: databaseUri || 'mongodb://ADDRESS',\n  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',\n  appId: process.env.APP_ID || 'APPID',\n  masterKey: process.env.MASTER_KEY || 'MASTERKEY',\n  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed\n  fileKey: 'FILEKEY',\nfilesAdapter: new S3Adapter( \n    process.env.AWS_ACCESS_KEY_ID || \"AKIAIEHF3KZUEYJTUOJA\",\n    process.env.AWS_SECRET_ACCESS_KEY || \"AWS_SECRET_ACCESS_KEY\",\n    process.env.BUCKET_NAME || \"BUCKET_NAME\"\n  )\n\n  liveQuery: {\n    classNames: [\"Users\", \"FritchDirectory\"] // List of classes to support for query subscriptions\n  }\n\n});\n// Client-keys like the javascript key or the .NET key are not necessary with parse-server\n// If you wish you require them, you can set them as options in the initialization above:\n// javascriptKey, restAPIKey, dotNetKey, clientKey\n\nvar app = express();\n\n// Serve static assets from the /public folder\napp.use('/public', express.static(path.join(__dirname, '/public')));\n\n// Serve the Parse API on the /parse URL prefix\nvar mountPath = process.env.PARSE_MOUNT || '/parse';\napp.use(mountPath, api);\n\n// Parse Server plays nicely with the rest of your web routes\napp.get('/', function(req, res) {\n  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');\n});\n\n// There will be a test page available on the /test path of your server url\n// Remove this before launching your app\napp.get('/test', function(req, res) {\n  res.sendFile(path.join(__dirname, '/public/test.html'));\n});\n\nvar port = process.env.PORT || 1337;\nvar httpServer = require('http').createServer(app);\nhttpServer.listen(port, function() {\n    console.log('parse-server-example running on port ' + port + '.');\n});\n\n// This will enable the Live Query real-time server\nParseServer.createLiveQueryServer(httpServer);\n\n//curl -X POST -H \"X-Parse-Application-Id:1bIi1xMZLEnYu1axn0SlDXu9xm7wSet25Y0hyvys\" -H \"Content-Type: application/json\" -d '{\"HerCell\":1337,\"title\":\"Sean Plott\",\"address\":321}' http://localhost:1337/parse/classes/FritchDirectory\n\n//export DATABASE_URI=mongodb://address\n\n\nThe output that I get for my Heroku App running Parse server is this:\nPlease tell me what must be going wrong with this?  I have followed all the guidelines for migrating from parse to heroku, but just do not understand what is going on her.e\n\n2016-12-06T16:52:43.317740+00:00 heroku[web.1]: State changed from crashed to starting\n2016-12-06T16:52:46.453553+00:00 heroku[web.1]: Starting process with command `npm start`\n2016-12-06T16:52:50.162903+00:00 app[web.1]: \n2016-12-06T16:52:50.162917+00:00 app[web.1]: > parse-server-example@1.4.0 start /app\n2016-12-06T16:52:50.162918+00:00 app[web.1]: > node index.js\n2016-12-06T16:52:50.162919+00:00 app[web.1]: \n2016-12-06T16:52:50.317661+00:00 app[web.1]: /app/index.js:23\n2016-12-06T16:52:50.317664+00:00 app[web.1]: filesAdapter: new S3Adapter(\n2016-12-06T16:52:50.317665+00:00 app[web.1]: ^^^^^^^^^^^^\n2016-12-06T16:52:50.317666+00:00 app[web.1]: SyntaxError: Unexpected identifier\n2016-12-06T16:52:50.317667+00:00 app[web.1]:     at Object.exports.runInThisContext (vm.js:76:16)\n2016-12-06T16:52:50.317667+00:00 app[web.1]:     at Module._compile (module.js:542:28)\n2016-12-06T16:52:50.317668+00:00 app[web.1]:     at Object.Module._extensions..js (module.js:579:10)\n2016-12-06T16:52:50.317668+00:00 app[web.1]:     at Module.load (module.js:487:32)\n2016-12-06T16:52:50.317669+00:00 app[web.1]:     at tryModuleLoad (module.js:446:12)\n2016-12-06T16:52:50.317669+00:00 app[web.1]:     at Function.Module._load (module.js:438:3)\n2016-12-06T16:52:50.317670+00:00 app[web.1]:     at Module.runMain (module.js:604:10)\n2016-12-06T16:52:50.317671+00:00 app[web.1]:     at run (bootstrap_node.js:394:7)\n2016-12-06T16:52:50.317672+00:00 app[web.1]:     at startup (bootstrap_node.js:149:9)\n2016-12-06T16:52:50.317672+00:00 app[web.1]:     at bootstrap_node.js:509:3\n2016-12-06T16:52:50.350495+00:00 app[web.1]: \n2016-12-06T16:52:50.364668+00:00 app[web.1]: npm ERR! Linux 3.13.0-100-generic\n2016-12-06T16:52:50.364914+00:00 app[web.1]: npm ERR! argv \"/app/.heroku/node/bin/node\" \"/app/.heroku/node/bin/npm\" \"start\"\n2016-12-06T16:52:50.365113+00:00 app[web.1]: npm ERR! node v6.9.1\n2016-12-06T16:52:50.365226+00:00 app[web.1]: npm ERR! npm  v3.10.8\n2016-12-06T16:52:50.365352+00:00 app[web.1]: npm ERR! code ELIFECYCLE\n2016-12-06T16:52:50.365448+00:00 app[web.1]: npm ERR! parse-server-example@1.4.0 start: `node index.js`\n2016-12-06T16:52:50.365582+00:00 app[web.1]: npm ERR! Exit status 1\n2016-12-06T16:52:50.367495+00:00 app[web.1]: npm ERR! \n2016-12-06T16:52:50.367496+00:00 app[web.1]: npm ERR! Failed at the parse-server-example@1.4.0 start script 'node index.js'.\n2016-12-06T16:52:50.367497+00:00 app[web.1]: npm ERR! Make sure you have the latest version of node.js and npm installed.\n2016-12-06T16:52:50.367498+00:00 app[web.1]: npm ERR! If you do, this is most likely a problem with the parse-server-example package,\n2016-12-06T16:52:50.367498+00:00 app[web.1]: npm ERR! not with npm itself.\n2016-12-06T16:52:50.367499+00:00 app[web.1]: npm ERR! Tell the author that this fails on your system:\n2016-12-06T16:52:50.367499+00:00 app[web.1]: npm ERR!     node index.js\n2016-12-06T16:52:50.367500+00:00 app[web.1]: npm ERR! You can get information on how to open an issue for this project with:\n2016-12-06T16:52:50.367501+00:00 app[web.1]: npm ERR!     npm bugs parse-server-example\n2016-12-06T16:52:50.367501+00:00 app[web.1]: npm ERR! Or if that isn't available, you can get their info via:\n2016-12-06T16:52:50.367502+00:00 app[web.1]: npm ERR!     npm owner ls parse-server-example\n2016-12-06T16:52:50.367503+00:00 app[web.1]: npm ERR! There is likely additional logging output above.\n2016-12-06T16:52:50.372745+00:00 app[web.1]: \n2016-12-06T16:52:50.373075+00:00 app[web.1]: npm ERR! Please include the following file with any support request:\n2016-12-06T16:52:50.373250+00:00 app[web.1]: npm ERR!     /app/npm-debug.log\n2016-12-06T16:52:50.467906+00:00 heroku[web.1]: State changed from starting to crashed\n2016-12-06T16:52:50.458594+00:00 heroku[web.1]: Process exited with status 1\n2016-12-06T16:52:50.367499+00:00 app[web.1]: npm ERR!     node index.js\n2016-12-06T16:52:50.367500+00:00 app[web.1]: npm ERR! You can get information on how to open an issue for this project with:\n2016-12-06T16:52:50.367501+00:00 app[web.1]: npm ERR!     npm bugs parse-server-example\n2016-12-06T16:52:50.367501+00:00 app[web.1]: npm ERR! Or if that isn't available, you can get their info via:\n2016-12-06T16:52:50.367502+00:00 app[web.1]: npm ERR!     npm owner ls parse-server-example\n2016-12-06T16:52:50.367503+00:00 app[web.1]: npm ERR! There is likely additional logging output above.\n2016-12-06T16:52:50.372745+00:00 app[web.1]: \n2016-12-06T16:52:50.373075+00:00 app[web.1]: npm ERR! Please include the following file with any support request:\n2016-12-06T16:52:50.373250+00:00 app[web.1]: npm ERR!     /app/npm-debug.log\n2016-12-06T16:52:50.467906+00:00 heroku[web.1]: State changed from starting to crashed\n2016-12-06T16:52:50.458594+00:00 heroku[web.1]: Process exited with status 1\n\n    ",
    title: "Heroku App Crashing Constantly",
    id: 16,
    PostTypeId: 1,
    bounty: 0.13427738520830745,
    UserId: 26,
    viewCount: 5,
    upvoteCount: 40,
    comments: 1
  },
  {
    body:
      '\nYour error is here (check arrow below):      \n\n  var api = new ParseServer({\n  databaseURI: databaseUri || \'mongodb://localhost:27017/dev\',\n  cloud: process.env.CLOUD_CODE_MAIN || __dirname + \'/cloud/main.js\',\n  appId: process.env.APP_ID || \'myAppId\',\n  masterKey: process.env.MASTER_KEY || \'\', //Add your master key here. Keep it secret!\n  fileKey: process.env.FILE_KEY || \'optionalFileKey\', // For migrated apps, this is necessary to provide access to files already hosted on parse.com. \n  serverURL: process.env.SERVER_URL || \'http://localhost:1337\',  // Don\'t forget to change to https if needed\n  filesAdapter: new S3Adapter( \n    process.env.AWS_ACCESS_KEY_ID || "AWS_ACCESS_KEY_ID",\n    process.env.AWS_SECRET_ACCESS_KEY || "AWS_SECRET_ACCESS_KEY",\n    process.env.BUCKET_NAME || "BUCKET_NAME"\n  )\n}); // <----------------\n  liveQuery: {\n    classNames: ["Users", "FritchDirectory"] // List of classes to support for query subscriptions\n  }\n\n\nWhere the arrow is, closes the api initialization making \n\nliveQuery: {\n    classNames: ["Users", "FritchDirectory"] // List of classes to support for query subscriptions\n }\n\n\ninvalid Javascript syntax.\n\nThe stack trace shows it as filesAdapter: new S3Adapter cause that\'s the last thing it recognizes\n\nI don\'t know your intention but it looks like it needs to be this:\n\nvar liveQuery = {\n    classNames: ["Users", "FritchDirectory"] // List of classes to support for query subscriptions\n }\n\n\nNote the equal sign instead of colon. The former is for property assignment of an object\n\nI just looked at an example.\nYou want to move the closing brackets down, after the livequery property like so:\n\n   filesAdapter: new S3Adapter( \n    process.env.AWS_ACCESS_KEY_ID || "AWS_ACCESS_KEY_ID",\n    process.env.AWS_SECRET_ACCESS_KEY || "AWS_SECRET_ACCESS_KEY",\n    process.env.BUCKET_NAME || "BUCKET_NAME"\n  ),\n  liveQuery: {\n    classNames: ["Users", "FritchDirectory"] // List of classes to support for query subscriptions\n  }\n}); // <----------------\n\n    ',
    id: 17,
    PostTypeId: 2,
    PostId: 16,
    bounty: 0.13427738520830745,
    UserId: 41,
    upvoteCount: 31
  },
  {
    body:
      "\n\nI'm trying to make my spotlight face its target when I translate it. I've tried glm::lookAt() with limited success. Lets say the light is at (0, 16, 0) and facing the origin. I've read that I need to translate the light to the origin, apply the rotation, then translate it back to its original position. How do I implement this?\n\nI have glm::lookAt(-lightPos, glm::vec3(0.f), upVector) but this gives me the light off to the side. This gives me the rotation matrix.\n    ",
    title: "Making object face another with rotation",
    id: 18,
    PostTypeId: 1,
    bounty: 0.3098456905802254,
    UserId: 83,
    viewCount: 6,
    upvoteCount: 19,
    comments: 0
  },
  {
    body:
      '\n\nI am using handlebars and it is working fine in development.  When I upload to github-pages, The handlebars template still works if i open directly to the page.  But if I go to a page in a link, the handlebars loop doesn\'t work.  Here is my code:\n\n<head>\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>\n    <script src="../bower_components/handlebars/handlebars.min.js"></script>\n</head>\n<div id="content-placeholder"></div> \n<script id="some-template" type="text/x-handlebars-template">\n  {{#each this}}\n    <div class=" col-md-4 col-sm-6 " data-animation-type="fadeIn" data-animation-delay="0.5s" data-animation-duration="2s">\n       <div class="item-wrap">\n          <figure class="">\n             <div class="popup-call">\n                <a href="assets/custom/images/blog/01.jpg" class="gallery-item"><i class="flaticon-arrows-4"></i></a>\n             </div>\n             <img src="{{this.picture.picture.url}}" class="img-responsive" style="height: 200px" alt="img11"/>\n             <figcaption>\n                <div class="post-header">\n                   <h5><a href="blogpost.html">{{this.name}}</a></h5>\n                </div>\n\n             </figcaption>\n          </figure>\n       </div>\n    </div>\n  {{/each}}\n</script>\n<script>\n    $(document).ready(function(){\n      var source   = $("#some-template").html();\n      var template = Handlebars.compile(source);\n      $.getJSON(\'https://my-url.com/teams.json\', function(data){\n        console.log(data);\n        $("#content-placeholder").html(template(data));\n      });\n    });\n\n</script>\n\n\nI\'ve tried doing it without the document.ready() but that doesn\'t change anything.\n    ',
    title: "handlebars not working in production after link click",
    id: 19,
    PostTypeId: 1,
    bounty: 0.3086814444395545,
    UserId: 19,
    viewCount: 10,
    upvoteCount: 24,
    comments: 1
  },
  {
    body:
      '\nIt\'s fairly clear that the handlebars.js isn\'t loading, because of the relative path in the script tag:\n\n\n\n <script src="../bower_components/handlebars/handlebars.min.js"></script>\n\n\n\n\nReplace src="" with your favorite CDN location:\n\nFor example\n\n\n\n<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.min.js"></script>\n\n\n\n    ',
    id: 20,
    PostTypeId: 2,
    PostId: 19,
    bounty: 0.3086814444395545,
    UserId: 58,
    upvoteCount: 17
  },
  {
    body:
      '\n\nI\'m having a really strange problem with an application I wrote a while back. It has worked without issues, but after leaving it alone for a while, it simply stopped functioning. I\'ll attach the code here:\n\ntry\n{\n    using (Process proc = Process.Start(starter))\n    {\n        windowHider();\n        proc.WaitForExit();\n\n        DateTime endStamp = DateTime.Now;\n        endStamp = truncate(endStamp);\n        TimeSpan diff = endStamp.Subtract(startStamp);\n\n        string programSource = "applicationName";\n        string logLocation = "Application";\n        string occurance = "Var=\'" + varName + "\' Var2=\'"+ var2Name + "\' Var3=\'" + var3Name + "\' Var4=\'" + var4Name + "\' Var5=\'" + var5Name + "\' Var6=\'" + var6Name + "\'";\n\n        try\n        {\n            if (!EventLog.SourceExists(programSource))\n            {\n                EventLog.CreateEventSource(programSource, logLocation);\n            }\n            else\n            {\n                EventLog.WriteEntry(programSource, occurance);\n            }\n        }\n        catch (Exception err)\n        {\n            string message = "There was an error with usage logging. Please contact IT.";\n            MessageBox.Show(message);\n            errorLogger(message, err.ToString(), ((Control)sender).Name);\n            this.Close();\n        }\n\n        this.Close();\n    }\n}\n\n\nWhen the process that was started exits, the program writes to the application log. For some reason, however, I am getting the following error:\n\n\n  Exception: System.ComponentModel.Win32Exception (0x80004005): The\n  specified path is invalid\n\n\nIt cites this line as the cause:\n\nEventLog.WriteEntry(programSource, occurance);\n\n\nAny ideas as to what this sudden problem could be?\n    ',
    title: "Can&#39;t Write to Windows Application Log (C#)",
    id: 21,
    PostTypeId: 1,
    bounty: 0.21298877692901375,
    UserId: 13,
    viewCount: 2,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      "\nI figured it out! There was something corrupted in the registry, and there must have been another corrupted component lurking around somewhere. I changed the sourcename, and it worked without any issues. \n\nThe original sourcename works on other machines, which makes me think it was definitely just something wonky with the registry.\n    ",
    id: 22,
    PostTypeId: 2,
    PostId: 21,
    bounty: 0.21298877692901375,
    UserId: 11,
    upvoteCount: 22
  },
  {
    body:
      "\n\nHow do I make socket server(made in node js) with node selection like the  one shown below in node.js in python3 ?\n\nvar app = require('express')();\nvar http = require('http').Server(app);\nvar io = require('socket.io')(http);\n\nio.on('connection', function(socket){\n    socket.on('pose', function(pose){\n        io.emit('pose', pose);\n        console.log(pose);\n    });\n});\nhttp.listen(3000, function () {\n    console.log('Socket.io Running');\n});\n\n    ",
    title: "Python socket server with selection",
    id: 23,
    PostTypeId: 1,
    bounty: 0.8209485585179555,
    UserId: 75,
    viewCount: 6,
    upvoteCount: 36,
    comments: 1
  },
  {
    body:
      "\nFound what I needed to do, here's the sample code with reference:\n\nfrom flask import Flask, render_template\nfrom flask_socketio import SocketIO, emit\n\napp = Flask(__name__)\napp.config['SECRET_KEY'] = 'secret!'\nsocketio = SocketIO(app)\n\n@socketio.on('my event')\ndef test_message(message):\n    emit('my response', {'data': 'got it!'})\n\nif __name__ == '__main__':\n    socketio.run(app, port = 3000)\n\n    ",
    id: 24,
    PostTypeId: 2,
    PostId: 23,
    bounty: 0.8209485585179555,
    UserId: 88,
    upvoteCount: 23
  },
  {
    body:
      "\n\nMy use case is this: I am looking to read a CSV file in Node and get only the headers. I don't want to write the results of a read stream to a file, rather push the headers to an array once the file is read, so I can take that array and do something to it later on. OR, better yet, take the stream and as it is being read, transform it, then send it to an array. File is a contrived value. I am stuck at this point, where the current output of datafile is an empty array:\n\nconst fs = require('fs');\nconst parse = require('csv-parse');\nconst file = \"my file path\";\nlet dataFile = [];\n\nrs = fs.createReadStream(file);\nparser = parse({columns: true}, function(err, data){\n    return getHeaders(data)\n})\n\nfunction getHeaders(file){\n    return file.map(function(header){\n        return dataFile.push(Object.keys(header))\n    })\n}\n\n\nWhat do I need to do in order to get the results I need? I am expecting the headers to be found in an array as the end result.\n    ",
    title: "Pipe NodeJS Stream to an Array",
    id: 25,
    PostTypeId: 1,
    bounty: 0.9129884477474688,
    UserId: 79,
    viewCount: 5,
    upvoteCount: 27,
    comments: 1
  },
  {
    body:
      "\nOk, so there is some confusing things in your code, and one mistake : you didn't actually call your code :)\n\nFirst, a solution, add this line, after parser : \n\nrs.pipe(parser).on('end', function(){\n    console.log(dataFile);\n});\n\n\nAnd magic, dataFile is not empty.\nYou stream the file from disk, pass it to the parser, then at the end, call a callback.\n\nFor the confusing parts : \n\nparser = parse({columns: true}, function(err, data){\n    // You don't need to return anything from the callback, you give the impression that parser will be the result of getHeaders, it's not, it's a stream.\n    return getHeaders(data)\n})\n\n\n\n\nfunction getHeaders(file){\n    // change map to each, with no return, map returns an array of the return of the callback, you return an array with the result of each push (wich is the index of the new object).\n    return file.map(function(header){\n        return dataFile.push(Object.keys(header))\n    })\n}\n\n\nAnd finaly : \nPlease choose with ending line with ; or not, but not a mix ;)\n\nYou should end with something like : \n\nconst fs = require('fs');\nconst parse = require('csv-parse');\nconst file = \"./test.csv\";\nvar dataFile = [];\n\nrs = fs.createReadStream(file);\nparser = parse({columns: true}, function(err, data){\n    getHeaders(data);\n});\n\nrs.pipe(parser).on('end', function(){\n    console.log(dataFile);\n});\n\nfunction getHeaders(file){\n        file.each(function(header){\n            dataFile.push(Object.keys(header));\n        });\n}\n\n    ",
    id: 26,
    PostTypeId: 2,
    PostId: 25,
    bounty: 0.9129884477474688,
    UserId: 66,
    upvoteCount: 39
  },
  {
    body:
      "\n\nI'm just trying to figure it out, why Fedora has not the static library libm.a, and if it is a fact, which i should use? \nAs mentioned here in StackOverflow i can simply install the pkg from yum, but is acceptable to think that Fedora have a replacement as default lib instead.No?\n\n\n\nedited\n\nI'm trying to compile this:\n\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid fred(int arg)\n{\n    printf(\"fred: you passed %d\\n\", arg);\n}\n\n\nand the output is this:\n\n$ gcc -o fred fred.c /usr/lib64/libm.so\n/usr/lib/gcc/x86_64-redhat-linux/6.2.1/../../../../lib64/crt1.o: En la función `_start':\n(.text+0x20): referencia a `main' sin definir\ncollect2: error: ld devolvió el estado de salida 1\n\n\nTest ggc with lm and /usr/lib/libm.a and /usr/lib64/libm.a\n\nI've done all mencioned here and other posts, yum install glibc-static and checked for /usr/lib64/libm.so\n\n\n\nedit\n\nrepoquery --whatprovides /usr/lib64/libm.a:\n\nfailure: repodata/repomd.xml from fedora-cisco-openh264: [Errno 256] No more mirrors to try.\nhttps://codecs.fedoraproject.org/openh264/24/x86_64/repodata/repomd.xml: [Errno -1] repomd.xml signature could not be verified for fedora-cisco-openh264\n\n\nthanks.\n    ",
    title: "Fedora dynamic replacement for libm.a(static lib)?",
    id: 27,
    PostTypeId: 1,
    bounty: 0.646020615602241,
    UserId: 73,
    viewCount: 8,
    upvoteCount: 33,
    comments: 1
  },
  {
    body:
      "\nSeveral things here....\n\n\nYou don't use any math functions in your little example, so you don't really need libm\nIf you did need libm, you don't really need the static libm.a. You can link against the dynamic one, and you can do this with gcc -lm rather than giving the file name directly.\nIf you did need libm.a for some reason, you could find it in the glibc-static package — but for a whole host of reasons this is not recommended.\nAs the error message says, what's really wrong is that you're missing a main() function. Try adding this to the bottom of your file:\n\nint main (int argc, char **argv)\n {\n     fred(1);\n     fred(2);\n     fred(42);\n }\n\n\nand then compile with gcc -o fred fred.c\n    ",
    id: 28,
    PostTypeId: 2,
    PostId: 27,
    bounty: 0.646020615602241,
    UserId: 16,
    upvoteCount: 37
  },
  {
    body:
      "\n\nI am trying to call a value that is stored in a ProfilesAPI file and use it in one of my views and am getting an error stating \" Cannot assign value of 'String?' to type 'Float!' \". Is there a way to convert either one of these so I get rid of the error. My code:\n\nvar ratePerMin: Float!\n\nProfilesAPI.apiV1ProfilesGet({ (data, error) in\n        if let profile = data {\n            if profile.rate == nil {\n                self.ratePerMin = 0.00\n            }\n            else {\n                self.ratePerMin = profile.rate\n            }\n\n        }\n        self.updateRatePerMin()\n})\n\n\nThe error is coming in on the line \"self.ratePerMin = profile.rate\n    ",
    title: "Assign value error in xcode/swift",
    id: 29,
    PostTypeId: 1,
    bounty: 0.7504227120196023,
    UserId: 60,
    viewCount: 5,
    upvoteCount: 21,
    comments: 1
  },
  {
    body:
      "\nYou can't assign a String to a Float. You need to coerce the String into a Float. Try this:\n\nself.ratePerMin = Float(profile.rate!)\n\n    ",
    id: 30,
    PostTypeId: 2,
    PostId: 29,
    bounty: 0.7504227120196023,
    UserId: 90,
    upvoteCount: 2
  },
  {
    body:
      "\n\nI want to return a list of job postings that are near a location (based on [latitude, longitude]). I am using geocoder and it seems to be working. I can import a CSV file with a list of addresses and geocoder populates the latitude and the longitude columns. \n\nBut I can't seem to get the near or nearby functions to work. It returns a undefined method error. I've tried following this: Rails Geocoder - Still learning which explains that nearby is a model function. But the example there did not work for me either. \n\nThis is what I have in my show.html.erb: \n\n<%= @jobposting.latitude %>, <%= @jobposting.longitude %>\n\n\n40.7494011, -73.9389437\n\n<% @location = Jobposting.near([@jobposting.latitude, @jobposting.longitude], 150) %>\n<%= @location.inspect %>\n\n\nIt does not error but returns a empty array: #<ActiveRecord::Relation []> when there are points within 10 miles of the latitude and longitude.\n\nI'm unsure if I am calling it incorrectly, based on the documentation it looks like near is used with the model but not limited to calling it in the model.\n    ",
    title: "Rails geocoder near",
    id: 31,
    PostTypeId: 1,
    bounty: 0.2217132993428632,
    UserId: 24,
    viewCount: 10,
    upvoteCount: 29,
    comments: 1
  },
  {
    body:
      "\nAs a partial answer, I believe the method is nearbys, not nearby. That might explain the undefined method error you mentioned. I don't know why you aren't getting results for the near function. The code you posted for the near method looks okay to me.\n    ",
    id: 32,
    PostTypeId: 2,
    PostId: 31,
    bounty: 0.2217132993428632,
    UserId: 93,
    upvoteCount: 36
  },
  {
    body:
      "\n\nI'm attempting to connect to a mlab db for production and my local db for development.  As far as I can tell my NODE_ENV is set to production.  But since I can't read it, I suspect that it's messed up somehow.  In addition, I keep connecting to my dev db.  \n\nI run my mongod instance.  And in another cli, navigate to my app folder, which houses my app.js file.  I'm following a tutorial which says to run \n\nprocess.env.NODE_ENV\n\n\nHowever, I get that this command is not recognized.  So I check my NODE_ENV variable using:  set\nI get NODE_ENV=production, which I had previously set.  However.  When I run my app using npm start I still connect to my dev server.  Here is my db.js code:\n\nvar mongoose = require('mongoose');\nvar gracefulShutdown;\nvar dbURI = 'mongodb://localhost/Loc8r';\n\nif(process.env.NODE_ENV == 'production'){\nconsole.log('we are in production');\n    dbURI = 'mongodb://username:password@ds55555.mlab.com:55555/dbname'\n}\nmongoose.connect(dbURI);\n\n\n// to address mongoose closing issues in windows\nvar readLine = require('readline');\nif (process.platform === \"win32\"){\n    var rl = readLine.createInterface({\n        input: process.stdin,\n        output: process.stdout\n    });\n    rl.on (\"SIGINT\", function(){\n        process.emit (\"SIGINT\");\n    });\n}\n// close Mongoose connection, passing in an anonymous function to run when closed\ngracefulShutdown = function(msg, callback){\n    mongoose.connection.close(function(){\n        console.log(\"Mongoose disconnected through \" + msg);\n        callback();\n    });\n};\n\nmongoose.connection.on('connected', function(){\n    console.log('Mongoose connected to ' + dbURI);\n});\n\nmongoose.connection.on('error', function(err){\n    console.log('Mongoose connection error: ' + err);\n});\n\nmongoose.connection.on('disconnected', function(){\n    console.log('Mongoose disconnected');\n});\n\n// for nodemon termination\nprocess.once('SIGUSR2', function(){\n    gracefulShutdown('nodemon restart', function(){\n        process.kill(process.pid, 'SIGUSR2');\n    });\n});\n\n// for app termination\nprocess.on('SIGINT', function(){\n    gracefulShutdown('app termination', function(){\n        process.exit(0);\n    });\n});\n\n// for HEroku termination\nprocess.on('SIGTERM', function(){\n    gracefulShutdown('Heroku app shutdown', function(){\n        process.exit(0);\n    });\n});\n\nrequire('./locations');\n\n\nNot sure where to start looking. I've exhausted my google searches.\n    ",
    title: "Cannot read $ process.env.NODE_ENV using Windows",
    id: 33,
    PostTypeId: 1,
    bounty: 0.40416675227169696,
    UserId: 48,
    viewCount: 7,
    upvoteCount: 31,
    comments: 1
  },
  {
    body:
      "\nSo, I found the answer in a clause in this comment \nhttps://stackoverflow.com/a/9250168/5574017\nApparently, in Windows, set NODE_ENV=production should be executed in the directory where you house app.js\n\nStill I cannot read my $ process.env.NODE_ENV\n\nbut I can read it with set and then searching for NODE_ENV\n\nSorry if I wasted your time.\n\nThanks, guys. \n    ",
    id: 34,
    PostTypeId: 2,
    PostId: 33,
    bounty: 0.40416675227169696,
    UserId: 39,
    upvoteCount: 5
  },
  {
    body:
      "\n\nI have the following code but I am getting the error,\n\n\n  Msg 537, Level 16, State 3, Line 1\n  Invalid length parameter passed to the LEFT or SUBSTRING function.\n\n\nCode:\n\nSELECT        \n    Main.HostName, LEFT(Main.Users, Len(Main.Users) - 1) AS [Users]\nFROM            \n    (SELECT DISTINCT \n         ST2.HostName,\n         (SELECT ST1.UserName + ', ' AS [text()]\n          FROM dbo.USERS ST1\n          WHERE ST1.HostName = ST2.HostName\n          ORDER BY ST1.HostName FOR XML PATH('')) [Users]\n     FROM           \n         dbo.USERS ST2) [Main]\n\n\nI am trying to left most user in each row. \n    ",
    title:
      "Invalid length parameter passed to the LEFT or SUBSTRING function error",
    id: 35,
    PostTypeId: 1,
    bounty: 0.9207228486347927,
    UserId: 98,
    viewCount: 2,
    upvoteCount: 37,
    comments: 1
  },
  {
    body: "\nYou have Main.Users with an empty string (len = 0)\n    ",
    id: 36,
    PostTypeId: 2,
    PostId: 35,
    bounty: 0.9207228486347927,
    UserId: 17,
    upvoteCount: 37
  },
  {
    body:
      "\n\nI'm trying to load a 3D model into Three.js with JSONLoader, and that 3D model is in the same directory as the entire website.\n\nI'm getting the \"Cross origin requests are only supported for HTTP.\" error, but I don't know what's causing it nor how to fix it.\n    ",
    title: "JavaScript opening local files not working",
    id: 37,
    PostTypeId: 1,
    bounty: 0.16020389028331494,
    UserId: 20,
    viewCount: 5,
    upvoteCount: 14,
    comments: 16
  },
  {
    body:
      "\nMy crystal ball says that you are loading the model using either file:// or C:/, which stays true to the error message as they are not http://\n\nSo you can either install a webserver in your local PC or upload the model somewhere else and use jsonp and change the url to http://example.com/path/to/model\n    ",
    id: 38,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 31,
    upvoteCount: 40
  },
  {
    body:
      "\nJust to be explicit - Yes, the error is saying you cannot point your browser directly at file://some/path/some.html\n\nHere are some options:\n\nPython 2\n\nIf you have Python installed...\n\n\nChange directory into the folder where your file some.html or file(s) exist using the command cd /path/to/your/folder\nStart up a Python web server using the command python -m SimpleHTTPServer\n\n\nThis will start a web server that hosts your entire directory listing, which will be made accessible through the following URL: http://localhost:8000\n\n\nYou can use a custom port  python -m SimpleHTTPServer 9000 giving you link: http://localhost:9000\n\n\nThis approach is built in to any Python installation.\n\nPython 3\n\nDo the same steps, but use the following command instead python3 -m http.server\n\nNode.js\n\nAlternatively, if you demand a more responsive setup and already use nodejs...\n\n\nInstall http-server by typing npm install -g http-server\nChange into your working directory, where yoursome.html lives \nStart your http server by issuing http-server -c-1\n\n\nThis spins up a Node.js httpd which serves the files in your directory as static files accessible from http://localhost:8080\n\nRuby\n\nIf your preferred language is Ruby ... the Ruby Gods say this works as well:\n\nruby -run -e httpd . -p 8080\n\n\nPHP\n\nOf course PHP also has its solution.\n\nphp -S localhost:8000\n\n    ",
    id: 39,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 100,
    upvoteCount: 32
  },
  {
    body:
      "\nIn Chrome you can use this flag:\n\n--allow-file-access-from-files\n\n\nRead more here.\n    ",
    id: 40,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 53,
    upvoteCount: 28
  },
  {
    body:
      "\nRan in to this today.\n\nI wrote some code that looked like this:\n\napp.controller('ctrlr', function($scope, $http){\n    $http.get('localhost:3000').success(function(data) {\n        $scope.stuff = data;\n    });\n});\n\n\n...but it should've looked like this:\n\napp.controller('ctrlr', function($scope, $http){\n    $http.get('http://localhost:3000').success(function(data) {\n        $scope.stuff = data;\n    });\n});\n\n\nThe only difference was the lack of http:// in the second snippet of code.\n\nJust wanted to put that out there in case there are others with a similar issue.\n    ",
    id: 41,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 61,
    upvoteCount: 15
  },
  {
    body:
      "\nJust change the url to http://localhost instead of localhost. If you open the html file from local, you should create a local server to serve that html file, the simplest way is using Web Server for Chrome. That will fix the issue.\n    ",
    id: 42,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 67,
    upvoteCount: 10
  },
  {
    body:
      "\nFor those on Windows without Python or Node.js, there is still a lightweight solution: Mongoose.\n\nAll you do is drag the executable to wherever the root of the server should be, and run it. An icon will appear in the taskbar and it'll navigate to the server in the default browser.\n\nAlso, Z-WAMP is a 100% portable WAMP that runs in a single folder, it's awesome. That's an option if you need a quick PHP and MySQL server.\n    ",
    id: 43,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 20,
    upvoteCount: 37
  },
  {
    body:
      "\nIn an Android app — for example, to allow JavaScript to have access to assets via file:///android_asset/ — use setAllowFileAccessFromFileURLs(true) on the WebSettings that you get from calling getSettings() on the WebView.\n    ",
    id: 44,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 34,
    upvoteCount: 7
  },
  {
    body:
      '\nI\'m going to list 3 different approaches to solve this issue:           \n\n\nUsing a very lightweight npm package: Install live-server using npm install -g live-server. Then, go to that directory open the terminal and do live-server page will be served at localhost:8080. BONUS: It also supports hot reloading by default.\nUsing a lightweight Google Chrome app developed by Google: Install the app then, go to the apps tab in Chrome and open the app. In the app point it to the right folder. Your page will be served!\nModifying Chrome shortcut in windows: Create a Chrome browser\'s shortcut. Right-click on the icon and open properties. In properties, edit target to "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession" and save. Then using Chrome open the page using ctrl+o. NOTE: Do NOT use this shortcut for regular browsing.\n\n    ',
    id: 45,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 24,
    upvoteCount: 28
  },
  {
    body:
      "\nIf you use Mozilla Firefox, It will work as expected without any issues; \n\nP.S. Even IE_Edge works fine, surprisingly!!\n    ",
    id: 46,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 69,
    upvoteCount: 28
  },
  {
    body:
      "\nI was getting this exact error when loading an HTML file on the browser that was using a json file from the local directory. In my case, I was able to solve this by creating a simple node server that allowed to server static content. I left the code for this at this other answer.\n    ",
    id: 47,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 60,
    upvoteCount: 32
  },
  {
    body:
      "\nI suggest you use a mini-server to run these kind of applications on localhost (if you are not using some inbuilt server).\n\nHere's one that is very simple to setup and run:\n\nhttps://www.npmjs.com/package/tiny-server\n\n    ",
    id: 48,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 70,
    upvoteCount: 35
  },
  {
    body:
      "\nIt simply says that the application should be run on a web server. I had the same problem with chrome, I started tomcat and moved my application there, and it worked.\n    ",
    id: 49,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 50,
    upvoteCount: 36
  },
  {
    body:
      '\ner. I just found some official words "Attempting to load unbuilt, remote AMD modules that use the dojo/text plugin will fail due to cross-origin security restrictions. (Built versions of AMD modules are unaffected because the calls to dojo/text are eliminated by the build system.)" https://dojotoolkit.org/documentation/tutorials/1.10/cdn/ \n    ',
    id: 50,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 66,
    upvoteCount: 40
  },
  {
    body:
      "\nOne way it worked loading local files is using them with in the project folder instead of outside your project folder. Create one folder under your project example files similar to the way we create for images and replace the section where using complete local path other than project path and use relative url of file under project folder .\nIt worked for me \n    ",
    id: 51,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 8,
    upvoteCount: 7
  },
  {
    body:
      '\nFor all y\'all on MacOS... setup a simple LaunchAgent to enable these glamorous capabilities in your own copy of Chrome...\n\nSave a plist, named whatever (launch.chrome.dev.mode.plist, for example) in ~/Library/LaunchAgents with similar content to...\n\n<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n    <key>Label</key>\n    <string>launch.chrome.dev.mode</string>\n    <key>ProgramArguments</key>\n    <array>\n        <string>/Applications/Google Chrome.app/Contents/MacOS/Google Chrome</string>\n        <string>-allow-file-access-from-files</string>\n    </array>\n    <key>RunAtLoad</key>\n    <true/>\n</dict>\n</plist>\n\n\nIt should launch at startup.. but you can force it to do so at any time with the terminal command\n\nlaunchctl load -w ~/Library/LaunchAgents/launch.chrome.dev.mode.plist\n\nTADA! 😎 💁🏻 🙊 🙏🏾\n    ',
    id: 52,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 97,
    upvoteCount: 13
  },
  {
    body:
      "\nMany problem for this, with my problem is missing '/' example:\njquery-1.10.2.js:8720 XMLHttpRequest cannot load http://localhost:xxxProduct/getList_tagLabels/\nIt's must be: http://localhost:xxx/Product/getList_tagLabels/\n\nI hope this help for who meet this problem.\n    ",
    id: 53,
    PostTypeId: 2,
    PostId: 37,
    bounty: 0.16020389028331494,
    UserId: 44,
    upvoteCount: 15
  },
  {
    body:
      "\n\nI am using dhtmlxTreeview: https://dhtmlx.com/docs/products/dhtmlxTreeView/\n\nI need to override an icon that is in a CSS file. If I go to the CSS file and override class, it is updated in the browser.\n\nBut when I run the first time and the pluging reloads again, the plugin doesn't respect the CSS override even if I use the !important keyword.\n\nHow can I override that icon file?\n\nI need to change this:\n\ni.dhxtreeview_icon.dhxtreeview_icon_file {\n    background-image:url(imgs/dhxtreeview_web/icon_file.gif);\n}\n\n\nTo this:\n\ni.dhxtreeview_icon.dhxtreeview_icon_file {\n    background-image:url(imgs/dhxtreeview_web/icon_folder_closed.gif) !important;\n}\n\n    ",
    title: "How to override icon class after plugin is loaded?",
    id: 54,
    PostTypeId: 1,
    bounty: 0.02212094753009053,
    UserId: 41,
    viewCount: 4,
    upvoteCount: 10,
    comments: 1
  },
  {
    body:
      "\nYou will have to link your CSS file after the library's. This will make CSS's native specificity override the library's styles with yours.\n\nExample: https://jsfiddle.net/zk4t2t8a/\n\n<style>\n  div {\n    background: red;\n  }\n</style>\n<style>\n  div {\n    background: green;\n  }\n</style>\n<div>\n    Test\n</div>\n\n\nMore information: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity\n    ",
    id: 55,
    PostTypeId: 2,
    PostId: 54,
    bounty: 0.02212094753009053,
    UserId: 12,
    upvoteCount: 25
  },
  {
    body:
      '\n\napoorva@apoorva-latitude-e6410:~/Documents/project$ node package.json\napoorva@apoorva-latitude-e6410:~/Documents/project$ npm install\nnpm WARN package.json @ No description\nnpm WARN package.json @ No repository field .\nnpm WARN package.json @ No README data\nnpm ERR! Linux 4.4.0-51-generic\nnpm ERR! argv "/usr/local/bin/node" "/usr/local/bin/npm" "install"\nnpm ERR! node v0.12.2\nnpm ERR! npm  v2.7.4\n\nnpm ERR! version not found: mongodb@3.2.11\nnpm ERR! \nnpm ERR! If you need help, you may report this error at:\nnpm ERR!     <https://github.com/npm/npm/issues>\n\nnpm ERR! Please include the following file with any support request:\nnpm ERR!     /home/apoorva/Documents/project/npm-debug.log\n\n\nHow to solve this problem?I tried a lot but unable to fix this problem.\n    ',
    title: "Unable to connect mongodb to node.js",
    id: 56,
    PostTypeId: 1,
    bounty: 0.6896532978130068,
    UserId: 63,
    viewCount: 1,
    upvoteCount: 28,
    comments: 1
  },
  {
    body:
      "\nLooks like you are referring to wrong MongoDB version on npm. Latest stable version of MongoDB on npm is 2.2.12. Please refer https://www.npmjs.com/package/mongodb\n    ",
    id: 57,
    PostTypeId: 2,
    PostId: 56,
    bounty: 0.6896532978130068,
    UserId: 3,
    upvoteCount: 33
  },
  {
    body:
      "\n\nIt seems like the documentation for templating in Grafana on OpenTSDB is rather cursory.  I'm having a hard time setting up even a basic template, and some pointers would be appreciated.  I have some simple metrics going into OpenTSDB and I'm trying to create a template.  So, here's a sample metric and its associated tags:\n\ndisk.free.percent\n  -- location\n    -- Seattle\n    -- Omaha\n  -- servertype\n    -- web\n    -- db\n  -- host\n    -- web01\n    -- web02\n    -- db01\n    -- db01\ndisk.free.gb\n  (Repeat tags/values)\n\n\nIdeally, what's I'm hoping to create is 4 dropdowns:\n\n\nSelection between disk.free.percent and disk.free.gb\nSelection of individual hosts\nSelection between locations\nSelection between servertypes\n\n\nBut, I'm having trouble with just a second step.  I have no problem getting the first menu using the following in the template settings:\n\nName:  fs\nType:  Query\nData Source:  MyTesterOTSD\nQuery:  metrics(fs)\n\n\nWith those settings, the preview of values works great and I can use $fs as a metric name to create graphs.  Excellent.  However, I'm having all sorts of problems with the next step.  I created a new variable with the following settings:\n\nName:  hosts\nType:  Query\nData Source:  MyTesterOTSD\nQuery:  $fs\nTags query:  tag_names(fs)\nTag values query:  tag_value(fs, host)\n\n\nThis does create a dropdown, but it only contains \"None\".  Apparently, I'm not catching the vision here.  I've tried variations-- $fs within the tags queries, etc.  How do I do this?  And is there a straightforward way to add in (3) and (4)?  Thank you.\n    ",
    title: "Grafana templates with OpenTSDB",
    id: 58,
    PostTypeId: 1,
    bounty: 0.9625346873831557,
    UserId: 35,
    viewCount: 1,
    upvoteCount: 2,
    comments: 0
  },
  {
    body:
      '\n\nI want to create a whole bunch of objects in an array, and I want them to be different templated types. The objective is that I want to update each of these objects and store the variable value they hold as a string. For example:\n\ntemplate <typename T> struct VariableToString\n{\n    VariableToString(T& varArg) : variable(varArg){};\n    T& variable;\n    std::string variableAsString;\n\n    void update()\n    {\n       variableAsString = std::to_string(variable); // <--- Compiler knows which overloaded function to call, but not through a pointer to this struct at runtime\n    }\n}\n\n\nI then want to have an std::vector of these objects, so I can iterate through all the objects and convert the variable values to string. I\'m not sure how/if I can do this. Basically something like this:\n\nstd::vector<Idontknow*> myVector;\nfor (auto i : myVector) i->update();\n\n\nUsually you would have a vector of pointers to base class and let virtualisation handle which function to call. But in this case I was wondering if it can be handled based on the type of the template. I thought about RTTI, would that be able to identify what type "variable" is and call the appropriate to_string() function?\n\nWill I have to just create a new derived version for each one? Like:\n\nstruct BaseClass\n{\n    virtual void update() = 0;\n}\n\nstruct DoubleToString : BaseClass\n{\n    double& variable\n    void update() override;\n} \n\nstd::vector<BaseClass*> myVector;\nfor (auto i : myVector) i->update();\n\n    ',
    title:
      "Can an element in a heterogenous array know what templated type it is?",
    id: 59,
    PostTypeId: 1,
    bounty: 0.1762599746261131,
    UserId: 97,
    viewCount: 9,
    upvoteCount: 35,
    comments: 2
  },
  {
    body:
      "\nKeep you derived class templated:\n\nstruct BaseClass\n{\n   virtual void update() = 0;\n}\ntemplate <typename T> struct VariableToString : BaseClass{/*...*/}\n\n\nThen you can use it the way you wanted:\n\nstd::vector<BaseClass*> myVector;\n/*...*/\nfor (auto i : myVector) i->update();\n\n\nThough consider using a smart pointer instead, e.g.\n\nstd::vector<std::unique_ptr<BaseClass>> myVector;\n/*...*/\nfor (auto i : myVector) i->update();\n\n\nOr use shared_ptr<> instead of unique_ptr.\n    ",
    id: 60,
    PostTypeId: 2,
    PostId: 59,
    bounty: 0.1762599746261131,
    UserId: 42,
    upvoteCount: 31
  },
  {
    body:
      '\nIf you have simply a template class it is quite easy to do the job. But also if your template is a wrapper for any other class, you can use it as long as it is derived from a common base class to get the right virtual method called. This has nothing to do with RTTI!\n\nUsing a wrapper makes it possible to use classes which have no common base class. And you also can specialize your wrapper for classes, which have a function with the same semantic but different name and signature.\n\nclass Base\n{\n    public:\n        virtual std::string ToString() = 0;\n\n        virtual ~Base() {}\n};\n\nclass A\n{\n    public:\n        std::string GetString() { return "From Type A"; }\n};\n\nclass B\n{\n    public:\n        std::string GetString() { return "From Type B"; }\n};\n\n\nclass C\n{   \n    public:\n        void Name(std::string& name)\n        {\n            name="From Type C";\n        }   \n};  \n\ntemplate < typename Inner >\nclass Wrapper: public Base, Inner\n{   \n    public:\n        std::string ToString() override { return Inner::GetString(); } \n};  \n\ntemplate <>\nclass Wrapper<C>: public Base, C\n{   \n    public:\n        std::string ToString() override \n        {\n            std::string name;\n            C::Name(name);\n            return name;\n        }   \n};  \n\nint main()\n{   \n    std::vector< Base*> elements;\n\n    elements.push_back( new Wrapper<A>);\n    elements.push_back( new Wrapper<B>);\n    elements.push_back( new Wrapper<C>);\n\n    for ( auto& el: elements )\n    {   \n        std::cout << el->ToString() << std::endl;\n    }   \n\n    for ( auto& el: elements )\n    {   \n        delete el; \n    }\n\n} \n\n    ',
    id: 61,
    PostTypeId: 2,
    PostId: 59,
    bounty: 0.1762599746261131,
    UserId: 37,
    upvoteCount: 19
  },
  {
    body:
      "\n\nI have a website that has an events category page where all articles that are 'events' will be listed. However, I would like to customize the top of this page to include a google calendar. How do I do this in Pelican without it affecting all the other categories? \n\nI tried changing the theme/article_list.html template to have a {% if category == 'events' %} html block but this did not work.\n\nThanks in advance\n    ",
    title: "How to customize individual category pages in Pelican",
    id: 62,
    PostTypeId: 1,
    bounty: 0.7030217753592576,
    UserId: 69,
    viewCount: 8,
    upvoteCount: 32,
    comments: 1
  },
  {
    body:
      "\ncategory is object which has property name (and other properties)\n\n{% if category.name == 'Events' %} \n\n    ",
    id: 63,
    PostTypeId: 2,
    PostId: 62,
    bounty: 0.7030217753592576,
    UserId: 55,
    upvoteCount: 2
  },
  {
    body:
      "\n\nI got in to a task where we have to publish Metadata of one table to another application via REST web services.\n\nBasically need is\n\n\nIt has to be weekly scheduler and every week we push the data to\nthem. \nSynchronous way.\nJob scheduler will kick up the job and call REST client.\n\n\nI am thinking using spring batch scheduler as it is simple and not with Quartz scheduler. Let me know you view and perspectives. \n    ",
    title: "Spring @scheduler vs. Quartz Scheduler which one is best",
    id: 64,
    PostTypeId: 1,
    bounty: 0.5310566348699377,
    UserId: 12,
    viewCount: 4,
    upvoteCount: 19,
    comments: 0
  },
  {
    body:
      "\n\nI had a problem writing a UTF-8 supported character (\\ufffd) to a text file. I was wondering what the most inclusive character set Python 3.x supports for writing string data to files.\n\nI was able to overcome the problem by \n\n\n  valEncoded = (origVal.encode(encoding='ASCII', errors='replace')).decode()\n\n\nwhich basically filtered out non-ASCII characters from origVal. But I figure Python file I/O should support more than ASCII, which is pretty conservative. So I am looking for what is the most inclusive character set supported.\n    ",
    title: "Which character encoding Python 3.x supports for file I/O?",
    id: 65,
    PostTypeId: 1,
    bounty: 0.35240068536037916,
    UserId: 73,
    viewCount: 2,
    upvoteCount: 20,
    comments: 1
  },
  {
    body:
      "\nAny of the UTF encodings should work:\n\n\nUTF-8 is typically the most compact (particularly if the text is largely ASCII compatible), and portable between systems with different endianness without requiring a BOM (byte order mark). It's the most common encoding used on non-Windows systems that support the full Unicode range (and the most common encoding used for serving data over a network, e.g. HTML, XML, JSON)\nUTF-16 is commonly used by Windows (the system \"wide character\" APIs use it as the native encoding)\nUTF-32 is uncommon, and wastes a lot of disk space, with the only real benefit being a fixed ratio between characters and bytes (you can divide file size by four after subtracting the BOM and you get the number of characters)\n\n\nIn general, I'd recommend going with UTF-8 unless you know it will be consumed by another tool that expects UTF-16 or the like.\n    ",
    id: 66,
    PostTypeId: 2,
    PostId: 65,
    bounty: 0.35240068536037916,
    UserId: 17,
    upvoteCount: 28
  },
  {
    body:
      "\n\nContext: I am implementing the Push-Relable Algorithm for MaxFlow in a network and  want to keep track of labels of all nodes, for each possible label (2*V-1 many) I want to have a doubly-linked list containing the nodes with that label. \n\nSo I have a vector where each entry is a list. Now I need to delete an element from one list and move it into another list in another vector-entry.\nIn order to do so, I use an vector (wich size is equal to the number of elements) where each entry is an interator, so I always know the position of each element.\nBefore implementing it on a bigger scale I wanted to try whether it works at all. So I create the two vectors, add one element into a list, store the iterator in the other vector and try to delete that element again.\nBut the std::vector::erase() method  always gets me SegFaults. Did I miss something?\n\nint V=50; \nint i=0, v=42;\n\nvector<list<int> > B(2*V-1);\nvector<list<int>::iterator> itstorage(V) ;\n\nB[i].push_back(v);\nitstorage[v]=B[i].end();\n\nB[i].erase(itstorage[v]);\n\n    ",
    title: "Storing and managing std::list::iterator",
    id: 67,
    PostTypeId: 1,
    bounty: 0.838022148723657,
    UserId: 6,
    viewCount: 1,
    upvoteCount: 18,
    comments: 1
  },
  {
    body:
      "\nB[i].end() does not refer to the last item you pushed, it is one past the item you pushed.\n\nWhat you want is:\n\nstd::list<int>::iterator p = B[i].end();\n--p;\n\n\nAlternatively, instead of using push_back, you could use the insert member function which returns an iterator to the newly inserted item.\n\nitstorage[v] = B[i].insert(B[i].end(), v);\n\n    ",
    id: 68,
    PostTypeId: 2,
    PostId: 67,
    bounty: 0.838022148723657,
    UserId: 87,
    upvoteCount: 19
  },
  {
    body:
      "\n\nI'm having some trouble getting some queries to work, What I would like is based off my sample data I would like to get the average elapsed time based on the TestDate Hour based on a certain day. So for example, If I have an elapsed time of 12 on Monday at 1 pm, and an elapsed time of 16 on Friday at 1 pm, I want the average elapsed time of Monday at 1 to be 12 and Friday to be 16 rather then the elapsed time at 1 pm in general is 14 (see query below for better explanation).\n\nHere is my sample data that I am working with:\n\n TestDate                   ElapsedTime\n2016-12-05 15:04:47.000     00:00:54.8507507\n2016-12-05 15:04:47.000     00:00:03.8507507\n2016-12-05 11:04:47.000     00:00:14.8507507\n2016-12-05 12:04:47.000     00:00:05.8507507\n2016-12-05 13:04:47.000     00:00:07.8507507\n2016-12-09 13:04:47.000     00:00:50.8507507\n2016-12-05 13:04:47.000     00:00:04.8507507\n2016-12-05 13:04:47.000     00:00:04.8507507\n2016-12-05 13:04:47.000     00:00:04.8507507\n2016-12-05 13:04:47.000     00:00:04.8507507\n2016-12-07 13:04:47.000     00:00:04.8507507\n2016-12-09 13:04:47.000     00:00:50.8507507\n\n\nNote: that the TestDate is a DateTime and the ElapsedTime is a varchar (It's saved as a TimeSpan and then converted to a string in a c# application).\n\nHere is my query that I am able to get an average Elapsed time with but I am not able to get hours based on days, just hours in general:\n\n  Select x.TestRunTime,\n    Avg(x.ElapsedTime) As AverageElapsedTime\nFROM \n(\n    SELECT\n    DATEPART(HOUR, CAST(TestDate AS TIME(6))) AS TestRunTime,\n    (DatePart(minute,Cast(ElapsedTime as Time(6))) * 60) +\n        DatePart(second,Cast(ElapsedTime as Time(6))) + \n        (DatePart(millisecond,Cast(ElapsedTime as Time(6))) * .001) \n        As ElapsedTime\n        FROM RunTimes\n) AS x\nGROUP BY x.TestRunTime\n\n\nCan anyone help me figure out what I am missing? I know I'm close, I just haven't been able to get the days section of the elapsed time.\n\nThanks,\n    ",
    title: "Having trouble getting Average based on Hour in DateTime SQL",
    id: 69,
    PostTypeId: 1,
    bounty: 0.7693525438180282,
    UserId: 20,
    viewCount: 2,
    upvoteCount: 37,
    comments: 2
  },
  {
    body:
      "\nI got it working using the Format function.\n\nHere is the code I did it with:\n\nSelect x.TestRunTime,\n    Avg(x.ElapsedTime) As AverageElapsedTime\nFROM \n(\n    SELECT\n        Format(TestDate, 'MMMM dd, HH') AS TestRunTime, \n    DATEPART(dw, TestDate) AS DayOfWeek,\n    (DatePart(minute,Cast(ElapsedTime as Time(7)))) +\n    DatePart(second,Cast(ElapsedTime as Time(7))) + \n    (DatePart(millisecond,Cast(ElapsedTime as Time(7))) * .0001) \n    As ElapsedTime\n    FROM RunTimes\n) AS x\nGROUP BY x.TestRunTime, x.DayOfWeek \n\n    ",
    id: 70,
    PostTypeId: 2,
    PostId: 69,
    bounty: 0.7693525438180282,
    UserId: 20,
    upvoteCount: 19
  },
  {
    body:
      "\nJust add one more datepart. And use DATEDIFF to get seconds with ms fraction.\n\nSelect x.TestRunTime,\n       x.DayOfWeek,     \n       Avg(x.ElapsedTime) As AverageElapsedTime\nFROM \n(\n    SELECT\n    DATEPART(HOUR, TestDate) AS TestRunTime, \n    DATEPART(dw, TestDate) AS DayOfWeek,\n    DATEDIFF(ms, 0, Cast(ElapsedTime as Time(6)))/1000. as  ElapsedTime\n        FROM RunTimes\n) AS x\nGROUP BY x.TestRunTime, x.DayOfWeek\n\n\nEDIT\n\nIf you need avg for every hour\n\nSelect x.TestRunTime,   \n       Avg(x.ElapsedTime) As AverageElapsedTime\nFROM \n(\n    SELECT\n    DATEADD(hh,DATEDIFF(hh,0,TestDate),0) AS TestRunTime, \n    DATEDIFF(ms, 0, Cast(ElapsedTime as Time(6)))/1000. as  ElapsedTime\n        FROM RunTimes\n) AS x\nGROUP BY x.TestRunTime\n\n    ",
    id: 71,
    PostTypeId: 2,
    PostId: 69,
    bounty: 0.7693525438180282,
    UserId: 20,
    upvoteCount: 35
  },
  {
    body:
      '\n\ni wanted to make an application with a design that looks like the app store so i followed let\'s build that app tutorial on how to build it and the result was excellent, when i tested it on my device it seem that when i fast scroll the collection-view the data that\'s in the first row take place on the last row and when scroll fast up again, the data that supposed to be in the last row i found it in the first row and when i scroll left and right in the row when the cell go off the screen it re-update to the right data but when fast scroll up and down fast again the data between the first row and last row go crazy.\ni added image to the case in the end of the code.i spent 5 days trying to fix this but no luck at all i tried alot of solution like reset the data in the cell to nil before reseting it and alot other u will find it in the code  but no luck , I really appreciate any help you can provide, Thanks  \n\n*update\n after @Joe Daniels answer all the data are staple and work fine except the images it still go crazy when fast scrolling but it return   after 7/8 sec of stopping scrolling to the right image\n\nfirst class that contain the vertical collectionview\ni made the width of the cell equal the width of the view , i tried the cell.tag == index-path.row solution but it didn\'t work \n\n        class HomePageVC: UIViewController  ,  UICollectionViewDataSource , UICollectionViewDelegate , UICollectionViewDelegateFlowLayout ,SWRevealViewControllerDelegate {\n\noverride func viewDidLoad() {\n    super.viewDidLoad()\n     mainProductsRow.delegate = self\n    mainProductsRow.dataSource = self\n}\n\n\n   func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {\n\n            if let count = productCategory?.count {\n            return count + 1\n        }\n        return 0\n\n}\n\nfunc collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {\n\n    if indexPath.row == 0 {\n        let   cell  = collectionView.dequeueReusableCell(withReuseIdentifier: LargeHomeCategoriesCell.identifier, for: indexPath) as! LargeHomeCategoriesCell\n        cell.categoriesHomePageVC = self\n        cell.catIndexPath = indexPath.row\n        cell.productCategories = productCategory\n        cell.seeMore.addTarget(self, action: #selector(self.seeMoreCat(_:)), for: UIControlEvents.touchUpInside)\n        return cell\n    }\n        let   cell  = collectionView.dequeueReusableCell(withReuseIdentifier: "RowCell", for: indexPath) as! HomeCategoriesCell\n\n        cell.categoriesHomePageVC = self\n        cell.catIndexPath = indexPath.row\n    cell.seeMore.tag = (indexPath.row - 1 )\n    cell.seeMore.addTarget(self, action: #selector(self.seeMore(_:)), for: UIControlEvents.touchUpInside)\n //   cell.tag = indexPath.row - 1\n    cell.productCategory = nil\n    //if cell.tag == indexPath.row - 1{\n        cell.productCategory = productCategory?[indexPath.row - 1 ]\n\n //   }\n        return cell\n\n\n}\n\n\n**Second Class that contain the horizontal collectionview that is in the first collectionview cell **\nin the cell-for-item-At-index-Path i printed the index-path.row when the view-load it printed 0 , 1 ,2 and didn\'t print the last index \'3\' and the same thing happen again when i scroll to the end of the collection view  \n\nclass HomeCategoriesCell: UICollectionViewCell , UICollectionViewDataSource , UICollectionViewDelegateFlowLayout , UICollectionViewDelegate{\n\n\n\n\n@IBOutlet weak var seeMore: UIButton!\n@IBOutlet weak var categorytitle: UILabel!\n@IBOutlet weak var productsCollectionView: UICollectionView!\n\nlet favFuncsClass = FavItemsFunctionality()\nlet onCartFuncsClass = OnCartFunctionality()\n\nvar productCategory : ProductCategories? {\n    didSet {\n        if let categoryTitle = productCategory?.name {\n            categorytitle.text = categoryTitle\n        }\n    }\n\n  override func awakeFromNib() {\n    recivedNotification()\n\n    productsCollectionView.delegate = self\n    productsCollectionView.dataSource = self\n    productsCollectionView.backgroundColor = UIColor.clear\n}\n\nfunc collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {\n    if let count = productCategory?.products?.count {\n        return count\n    }\n    return 0\n}\nfunc collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {\n    print(indexPath.row)\n    let   cell  = collectionView.dequeueReusableCell(withReuseIdentifier: "HProductCell", for: indexPath) as! HomeProductCell\n    cell.tag = indexPath.row\n\n    cell.productImage.image = #imageLiteral(resourceName: "PlaceHolder")\n    cell.productTitle.text = nil\n    cell.productPrice.text = nil\n    cell.discountLabel.text = nil\n    cell.preDiscountedPrice.text = nil\n    cell.favButton.setImage(UIImage(named:"Heart_icon"), for: UIControlState.normal)\n    cell.addToCart.setImage(UIImage(named:"cart"), for: UIControlState.normal)\n    cell.configCell(products: nil)\n    if cell.tag == indexPath.row {\n        cell.configCell(products: productCategory?.products?[indexPath.item])\n    }\n    cell.catNum = indexPath.row\n\n    return cell\n}\n    // Thanks to Joe Daniels i added this code and my nightmare become way less scary :P \n      override func prepareForReuse() {\n    super.prepareForReuse()\n    productsCollectionView.reloadData()\n  }\n\n}\n\n\nProduct Cell\n i tried the prepare-For-Reuse() and reseted all the data to nil but still didn\'t work \n\n  class HomeProductCell: UICollectionViewCell {\n\nfunc configCell(products :productDetails?){\n      if let title = products?.name {\n        self.productTitle.text = title\n    }else {  self.productTitle.text = nil}\n\n    if let price = products?.price {\n        self.productPrice.text = "\\(price)"\n    }else { self.productPrice.text = nil }\n\n    }\n\n  override func prepareForReuse() {\n    super.prepareForReuse()\n    self.productImage.image = #imageLiteral(resourceName: "PlaceHolder")\n    productTitle.text = nil\n    productPrice.text = nil\n    discountLabel.text = nil\n    preDiscountedPrice.text = nil\n    favButton.setImage(UIImage(named:"Heart_icon"), for: UIControlState.normal)\n    addToCart.setImage(UIImage(named:"cart"), for: UIControlState.normal)\n\n}\n\n\ni took a screen shoots of the case you can find it    here \n    ',
    title:
      "while fast scrolling collectionview the first row data dublicate in the last row",
    id: 72,
    PostTypeId: 1,
    bounty: 0.22224908313879777,
    UserId: 68,
    viewCount: 7,
    upvoteCount: 11,
    comments: 2
  },
  {
    body:
      "\nThe inner collectionView has no way of knowing that it went off screen. do a reload in prepareForReuse\n    ",
    id: 73,
    PostTypeId: 2,
    PostId: 72,
    bounty: 0.22224908313879777,
    UserId: 39,
    upvoteCount: 8
  },
  {
    body:
      '\ni Found the Perfect Solution that worked for me as magic after 15 days of suffering xD i used this library (https://github.com/rs/SDWebImage).\n\nTo use it in swift put this line in your bridging Header  \n\n#import <SDWebImage/UIImageView+WebCache.h>\n\n\nAnd in the collectionViewCell i used this line \n\nself.productImage.sd_setImage(with: myUrl , placeholderImage: UIImage(named:"yourPlaceHolderImage")\n\n    ',
    id: 74,
    PostTypeId: 2,
    PostId: 72,
    bounty: 0.22224908313879777,
    UserId: 48,
    upvoteCount: 26
  },
  {
    body:
      "\n\nThis blog post describes very well how to setup notifications for failed jobs within the Pipeline DSL.\n\nUnfortunately, this approach has a severe drawback: There is no (email) notification at all if the SCM is not reachable because Jenkins is not able to checkout the Jenkinsfile. Does anyone know a solution or workaround for that so that I get notified if a Pipeline Job fails because of SCM issues while checking out the Jenkinsfile (or also in case of syntax errors within the Jenkinsfile)?\n    ",
    title:
      "How to get notified about SCM / version control issues when using Jenkins 2.0 pipelines?",
    id: 75,
    PostTypeId: 1,
    bounty: 0.7173973545411001,
    UserId: 81,
    viewCount: 10,
    upvoteCount: 22,
    comments: 1
  },
  {
    body:
      "\nIf you have the Email-ext plugin installed you can call it from your pipeline script.\n\nYou can use the snippet generator that comes with pipeline plugin (available at $JENKINS_URL/pipeline-syntax).\nSelect the plugin and configure it as you would used to do in a post build step. \n\nPut the generated snippet in your pipeline. You might want to wrap it in a try {..} finally {..}\n\nemailext attachLog: true, \n    body: 'Oops', \n    recipientProviders: [[ $class: 'DevelopersRecipientProvider']], \n    subject: 'Failing tests', to: 'someone@example.com'\n\n\nThe beuaty about this pipeline-syntax is that it will dynamically add the plugins you install (so if you used to use a different notification plugin, it should show up here).\n\nYou can also take a look at this documentation where they give some examples as well.\n\nThis is a similar question\n    ",
    id: 76,
    PostTypeId: 2,
    PostId: 75,
    bounty: 0.7173973545411001,
    UserId: 57,
    upvoteCount: 6
  },
  {
    body:
      '\n\nI have to work with HTML files where the following tooltip is extensively used:\n\n<div class="tooltip">\n  Text\n  <span class="popup">\n  Tooltip\n  </span>\n</div>\n\n\nAnd the CSS:\n\n.tooltip span[class="popup"] {\n                z-index:10;display:none; padding:7px 10px;\n                }\n.tooltip:hover span[class="popup"]{\n                display:inline; position:absolute; color:#111;\n                border:1px solid #DCA; background:#fffAF0;\n          }\n\n\nhttps://jsfiddle.net/f1tztx15/2/\n\nMy problem is that the tooltip not only appears when I hover over "Text" but also when I hover over the blank space at the right of "Text" (see below).\n\nTooltip appearing when blank space is hovered\n\nIs there a way to limit the "hoverable" region to the text without changing the whole tooltip? (I don\'t really have the freedom to do that)\n\nThanks!\n    ',
    title: "How to make a tolltip appear only when hovering over text?",
    id: 77,
    PostTypeId: 1,
    bounty: 0.04715614978216154,
    UserId: 47,
    viewCount: 1,
    upvoteCount: 36,
    comments: 1
  },
  {
    body:
      "\nTry using CSS to limit the width or padding of the element.\n\nEg. \n\n.tooltip:\n width: 100%;\n padding: 0px;\n\nThis could limit the width of your tooltip element.\n\nYou could also just use a <span> element. Which would also contain the element within its own bounds.\n    ",
    id: 78,
    PostTypeId: 2,
    PostId: 77,
    bounty: 0.04715614978216154,
    UserId: 14,
    upvoteCount: 34
  },
  {
    body:
      '\n\nI am having some serious trouble with my script... for some reason the console isn\'t talking to me and my output isn\'t showing up... What I\'m trying to do here is get the output to be a thousand when the number reaches 1000 and million when the number reaches 1000000 and all the way to Quintilian. Please help!\n\n\n\n<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p id="output"></p>\n<button onclick="collectWood()" id="woodButton">collect wood</button>\n<script>\nwindow.addEventListener("DOMcontentLoaded", function(){\nvar wood = +localStorage.getItem("woodSave");\nvar woodOut = document.getElementById("output");\nvar woodbtn = document.getElementById(\'woodButton\');\n\nwoodThousand();\nwoodMillion();\nwoodBillion();\nwoodTrillion();\nwoodQuadrillion();\nwoodQuintillion();\n\nwoodbtn.addEventListener("click", collectWood);\n\nfunction collectWood() {\n\twood +=1;\n\twoodOut.innerHTML = wood;\n\tlocalStorage.setItem("woodSave", wood);\n\twoodThousand();\n\twoodMillion();\n\twoodBillion();\n\twoodTrillion();\n\twoodQuadrillion();\n\twoodQuintillion();\n}\nfunction woodThousand() {\n\tconsole.log(wood);\n\twoodOut.textContent = (wood >= 1000) ? (wood / 1000).toFixed(2) + "Thousand":wood;\n}\nfunction woodMillion() {\n\twoodOut.textContent = (wood >= 1000000) ? (wood / 1000000).toFixed(2) + "Million":wood;\n}\nfunction woodBillion() {\n\twoodOut.textContent = (wood >= 1000000000) ? (wood / 1000000000).toFixed(2) + "Billion":wood;\n}\nfunction woodTrillion() {\n\twoodOut.textContent = (wood >= 1000000000000) ? (wood / 1000000000000).toFixed(2) + "Trillion":wood;\n}\nfunction woodQuadrillion() {\n\twoodOut.textContent = (wood >= 1000000000000000) ? (wood / 1000000000000000).toFixed(2) + "Quadrillion":wood;\n}\nfunction woodQuintillion() {\n\twoodOut.textContent = (wood >= 1000000000000000000) ? (wood / 1000000000000000000).toFixed(2) + "Quintillion":wood;\n}\nsetInterval(function() { \nwoodThousand();\nwoodMillion();\nwoodBillion();\nwoodTrillion();\nwoodQuadrillion();\nwoodQuintillion();\n}, 1);\n});\n</script>\n</body>\n</html>\n\n\n\n    ',
    title: "Changing the end of a number",
    id: 79,
    PostTypeId: 1,
    bounty: 0.2787926906716267,
    UserId: 17,
    viewCount: 3,
    upvoteCount: 16,
    comments: 1
  },
  {
    body:
      "\nlocalStorage won't work on SO, so please see this Fiddle for a solution. Your code had some issues:\n\nFirst it's DOMContentLoaded (with a capital \"C\"). That's why nothing happens when the page starts. Second, you don't need the onclick=\"collectWood() because that is being taken care of in the JavaScript.\n\nProbably the biggest change is that you don't need a different function for each level that the wood count gets to. One function will do (see the if/then in the Fiddle).\n    ",
    id: 80,
    PostTypeId: 2,
    PostId: 79,
    bounty: 0.2787926906716267,
    UserId: 77,
    upvoteCount: 4
  },
  {
    body:
      '\n\nI want to rewrite this piece of code in terms of streams from Java 8\n\nfor (Medium medium : sortierteMedien) {\n    System.out.println("Fuenf aehnlichste Medien fuer " + medium.getClass() + " mit dem Titel " + medium.getTitel() + ":\\n");\n\n\n    for (Medium medium1 : bibliothek.medienSim(medium)) {\n        System.out.println(medium1.toString());\n    }\n\n    System.out.println();\n}\n\n\nThe difficulty here is, that there is a print statement before and after each inner for loop.\n\nIs it possible to rewrite this with streams?\n    ',
    title: "Nested forEach in Java 8",
    id: 81,
    PostTypeId: 1,
    bounty: 0.9095625458163821,
    UserId: 72,
    viewCount: 8,
    upvoteCount: 39,
    comments: 1
  },
  {
    body:
      '\nImperative statements within loops aren’t typical tasks for Stream API use. You still could do this using lambda expressions without the Stream API, i.e.\n\nsortierteMedien.forEach(medium -> {\n    System.out.println("Fuenf aehnlichste Medien fuer "\n        +medium.getClass()+" mit dem Titel "+medium.getTitel()+":\\n");\n    bibliothek.medienSim(medium).forEach(System.out::println);\n    System.out.println();\n});\n\n\nIt would be a different thing, if you want to collect everything into one String before printing:\n\nString result = sortierteMedien.stream().flatMap(medium -> Stream.concat(\n        Stream.of("Fuenf aehnlichste Medien fuer "\n            +medium.getClass()+" mit dem Titel "+medium.getTitel()+":\\n"),\n        bibliothek.medienSim(medium).stream().map(Medium::toString)\n    ))\n    .collect(Collectors.joining("\\n"));\nSystem.out.println(result);\n\n    ',
    id: 82,
    PostTypeId: 2,
    PostId: 81,
    bounty: 0.9095625458163821,
    UserId: 92,
    upvoteCount: 38
  },
  {
    body:
      "\n\nI wanted to learn Lua so I bought a book.  The problem I'm having is finding a compiler/interpreter.  I downloaded the binary compiler for Windows from http://luadist.org/ (Windows x86 (MinGW32 4.7.1)).  But every time I try to start it up I just says:\n\n\n  The program can't start because lua53.dll is missing from your\n  computer.  Try reinstalling the program to fix this problem.\n\n\nWhich I did several times to no avail.  I've tried to find another compiler but this seems to be the only one... which I find hard to believe.  There are \"demo\" compilers but I want one I can install so I can do the examples in the book.  There are instructions on how to \"compile\" the compiler at the Lua site on Linux and Mac machines but I'm working on a Windows machine.\n\nAny help?\n    ",
    title: "Trouble getting started with Lua",
    id: 83,
    PostTypeId: 1,
    bounty: 0.5728223968022945,
    UserId: 17,
    viewCount: 6,
    upvoteCount: 21,
    comments: 1
  },
  {
    body:
      '\nZeroBrane Studio is the best for Lua.  It works on Windows, Mac, and Linux.  It was specifically designed for beginners, but it a full featured IDE for writing and debugging Lua code.  \n\nhttps://studio.zerobrane.com/\n\nBe sure to try the "Run as Scratchpad" feature which provides a "live-coding" experience.\n    ',
    id: 84,
    PostTypeId: 2,
    PostId: 83,
    bounty: 0.5728223968022945,
    UserId: 2,
    upvoteCount: 13
  },
  {
    body:
      "\n\nConsider the following numpy array array:\n\nx = np.array([2]*4, dtype=np.uint8)\n\n\nwhich is just an array of four 2's.\n\nI want to perform a bitwise_and reduction of this array:\n\ny = np.bitwise_and.reduce(x)\n\n\nI expect the result to be:\n\n2\n\n\nbecause each element of the array is identical, so successive AND's should yield the same result, but instead I get:\n\n0\n\n\nWhy the discrepancy? \n    ",
    title: "Reduction of NumPy bitwise_and function",
    id: 85,
    PostTypeId: 1,
    bounty: 0.5226190410956479,
    UserId: 1,
    viewCount: 4,
    upvoteCount: 31,
    comments: 1
  },
  {
    body:
      "\nIn the reduce docstring, it is explained that the function is equivalent to\n\n r = op.identity # op = ufunc\n for i in range(len(A)):\n   r = op(r, A[i])\n return r\n\n\nThe problem is that np.bitwise_and.identity is 1:\n\nIn [100]: np.bitwise_and.identity\nOut[100]: 1\n\n\nFor the reduce method to work as you expect, the identity would have to be an integer with all bits set to 1.\n\nThe above code was run using numpy 1.11.2.  The problem has been fixed in the development version of numpy:\n\nIn [3]: np.__version__\nOut[3]: '1.13.0.dev0+87c1dab'\n\nIn [4]: np.bitwise_and.identity\nOut[4]: -1\n\nIn [5]: x = np.array([2]*4, dtype=np.uint8)\n\nIn [6]: np.bitwise_and.reduce(x)\nOut[6]: 2\n\n    ",
    id: 86,
    PostTypeId: 2,
    PostId: 85,
    bounty: 0.5226190410956479,
    UserId: 92,
    upvoteCount: 25
  },
  {
    body:
      '\n\nThe purpose of this program is to test another program I created.\n\nIt\'s called ComplexNumber. This class has everything from add, multiply, dividing complex numbers numbers and stuff and they are all in methods. The teacher wants us to create a testing class, here is what I have so far.\n\nThe problem I am having is calling the methods from the ComplexNumber class. For example: I tried calling the plus method, this method takes in two ComplexNumbers and adds them up. So far I\'ve been testing these methods using the interaction panel and it has worked great. The way I called them in the interaction panel was by doing first.plus(Second) and this would give the final values.\n\nOn the testing class, I am having difficulty calling the methods.\nI know that I need the class name.\n\nI tried:  \n\nComplexNumber.first.plus(second)\n\n\nBut it didn\'t work.\nHow can I do it?\n\nHere is my code:\n\nclass TestComplexNumber\n{\n    double real;         \n    double imag;\n\n    public TestComplexNumber(double a, double b)\n    {\n        this.real=a;\n        if ((b<1000)&&(b>-1000))\n            this.imag=b;\n        else\n        {\n            this.imag=0;\n            System.out.println("The value you typed in for imag is <1000 or >-1000, value of imag is assigned the value of 0.");\n        }\n    }\n\n    public String toString()\n    {\n        double real,imag;\n        real=this.real;\n        imag=this.imag;\n\n        if (((real<0)||(real>0))&&(imag%1!=0))\n        {\n            if (roundThreeDecimals(imag)>0)\n                return ""+roundThreeDecimals(real)+"+"+roundThreeDecimals(imag)+"i";\n            else\n                return ""+roundThreeDecimals(real)+""+roundThreeDecimals(imag)+"i";\n        }\n        else if ((real%1!=0)&&(imag!=0))\n            return ""+roundThreeDecimals(real)+"+"+(int)imag+"i";\n        else if((real==0)&&(imag%1!=0))\n            return ""+imag+"i";        \n        else if ((real==0)&&(imag !=0))\n            return ""+(int)imag+"i";\n        else if ((imag==0)&&(real!=0))\n             return ""+(int)real+"";\n        else if (((real<0)||(real>0))&&(imag<0))\n            return ""+(int)real+"-"+(int)Math.abs(imag)+"i";\n        else if((real!=0)&&(imag!=0))\n            return ""+(int)real+"+"+(int)imag+"i";\n        else \n            return "";\n     }\n\n     public static double roundThreeDecimals(double c)\n     {\n         double temp = c*1000;\n         temp = Math.round(temp);\n         temp = temp /1000;\n         return temp;\n     }  \n\n    public static void main(String args[])\n    {\n        for(int i=0;i<1;i++)\n        {\n            //Testing decimal values\n        TestComplexNumber first=new TestComplexNumber((int)(Math.random()*100)-(int)(Math.random()*100),(Math.random()*100));\n            TestComplexNumber second=new      TestComplexNumber((Math.random()*100),(Math.random()*100)-(int)(Math.random()*100));\n            //Testing whole values\n            TestComplexNumber third=new TestComplexNumber((int)(Math.random()*100)-(int)(Math.random()*100),(int)(Math.random()*100));\n            TestComplexNumber fourth=new TestComplexNumber((Math.random()*100)-(int)(Math.random()*100),(int)(Math.random()*100));\n\n            System.out.println(first);\n            System.out.println(second);\n            System.out.println(third);\n            System.out.println(fourth);      \n            System.out.println("Test value for plus:"+first+second+" which added="+plus(second));  \n        }\n\n    }\n}\n\n\nExample of a method on the ComplexNumber class:\n\npublic ComplexNumber plus(ComplexNumber other) {\n    ComplexNumber sum= new ComplexNumber(this.real,this.getImag());\n\n    sum.real=(this.real)+(other.real);\n    sum.setImag((this.getImag())+(other.getImag()));\n\n    return sum;\n}\n\n    ',
    title: "Calling an instance method from a different class",
    id: 87,
    PostTypeId: 1,
    bounty: 0.40057143881779544,
    UserId: 85,
    viewCount: 1,
    upvoteCount: 20,
    comments: 2
  },
  {
    body:
      '\npublic class Tester {\n    public static void main(String [] args) {\n        // create two objects of ComplexNumbers with whatever values you like\n        ComplexNumber numA = new ComplexNumber(....);\n        ComplexNumber numB = new ComplexNumber(....);\n\n        // then add them and store the returned reference into a new variable\n        ComplexNumber result = numA.plus(numB);\n        // print the number however you like\n        System.out.println(result.real + " + i" + result.getImag());\n\n    }\n\n}\n\n    ',
    id: 88,
    PostTypeId: 2,
    PostId: 87,
    bounty: 0.40057143881779544,
    UserId: 27,
    upvoteCount: 40
  },
  {
    body:
      '\nI don\'t know what this "interaction panel" is, but first.plus(second) from there should work no different than in the actual code. \n\nplus is the method called in the first instance. \n\nThe method should not be static, as in static ComplexNumber plus(ComplexNumber other), so you do not need the class name to use it. \n\nIn conclusion, to call an instance method from another class, you need an instance, which you have should have four calls to new ComplexNumber(), and not new TestComplexNumber()\n\n\n\n\n  My teacher said i have to create the testing program in a new class and not on the ComplexNumber class\n\n\nI think your real issue is that you have this class TestComplexNumber, which is only intended to be a "test class" (only need a main method), not a re-creation of the ComplexNumber class, which seems to be what you\'ve done (since I see no plus, mutiply, divide, etc). \n\n\n\nAnd if you are supposed to actually create a "test suite", not a main method, then you should use JUnit, or other testing framework\n    ',
    id: 89,
    PostTypeId: 2,
    PostId: 87,
    bounty: 0.40057143881779544,
    UserId: 21,
    upvoteCount: 6
  },
  {
    body:
      "\n\nSince Dec. 1st, I am not able to access a Firebase Database node directly with a URL. It throws me back to the Console Homepage.\n\nIs anyone else seeing this same problem? What's the workaround or way to resolve this?\n\nFor instance, if I try to browse:\n\nhttps://myfirebaseurl.firebaseio.com\n\n\nIt takes me to the Console homepage. I also tried the new URL and that does not seem to work either:\n\n    https://console.firebase.google.com/project/firebase-myfirebasedomain/overview\n\n    ",
    title: "Firebase URL to Database node stopped working on Dec. 1st",
    id: 90,
    PostTypeId: 1,
    bounty: 0.5546440617294592,
    UserId: 19,
    viewCount: 8,
    upvoteCount: 34,
    comments: 1
  },
  {
    body:
      "\nFirebase had a transient issue that they emailed me about, and is now fixed.\n    ",
    id: 91,
    PostTypeId: 2,
    PostId: 90,
    bounty: 0.5546440617294592,
    UserId: 53,
    upvoteCount: 19
  },
  {
    body:
      '\n\nI am a beginner in Java, so my question would be pretty basic. Here is my problem I have a class where I process folders for query matching and indexing.I have made a GUI for the same where I will ask the user to select the directory from JFileChooser.\n\nprivate void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {                                         \n\n\n   JFileChooser f=new JFileChooser();\n   f.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);\n   f.showOpenDialog(null);\n   if(f.showOpenDialog(this)==JFileChooser.APPROVE_OPTION){\n\n}\n    System.out.println(f.getSelectedFile().getAbsolutePath());\n\n\n}         \n\n\nNow I want to give this directory path to my other class so it can process the folder\n\n obj = new object();\n            boolean index = false;\n            String str = "";\n            InputStreamReader r = new InputStreamReader(System.in);\n            obj.dataDirectory = // here should be the path of the selected folder\n\n\nFor Example, if a user selects c:\\Desktop\\TextFiles then what I want want is obj.dataDirectory=c:\\Desktop\\TextFiles\n\nI tried creating an object of GUI class in this class and then tried calling that method in this class but I don`t know how to do it exactly or even if it is possible.\n\nThanks in Advance \n    ',
    title:
      "Taking a directory from java GUI and passing it to another class for processing",
    id: 92,
    PostTypeId: 1,
    bounty: 0.8327115843153896,
    UserId: 81,
    viewCount: 5,
    upvoteCount: 15,
    comments: 0
  },
  {
    body:
      "\n\nIn the below awk I am trying to capture all conditions ofKCNMA1, the line in gene (which is a one column list of names) that are in $8 of file which is tab-delimited\n\nSo in the below example all instances/lines where KCNMA1 appear in $8would be printed to output.\n\nThere could also be multiple ;, however the name, in this case KCNMA1 will be included. The awk seems to capture 2 of the possible 4 conditions but not all instances as shown by the current output. Thank you :).\n\ngene\n\nKCNMA1  \n\n\nfile\n\nR_Index Chr Start   End Ref Alt Func.IDP.refGene    Gene.IDP.refGene    GeneDetail.IDP.refGene\n4629    chr10   78944590    78944590    G   A   intergenic  NONE;KCNMA1 dist=NONE;dist=451371\n4630    chr10   79396463    79396463    C   T   intronic    KCNMA1  .\n4631    chr10   79397777    79397777    C   -   exonic  KCNMA1;X1X  .\n4632    chr10   81318663    81318663    C   G   exonic  SFTPA2  .\n4633    chr10   89397777    89397777    -   GAA exonic  NONE;X1X;KCNMA1 .\n\n\ncurrent output\n\nR_Index Chr Start   End Ref Alt Func.IDP.refGene    Gene.IDP.refGene    GeneDetail.IDP.refGene\n1   chr10   79396463    79396463    C   T   intronic    KCNMA1  .\n2   chr10   79397777    79397777    C   -   exonic  KCNMA1;X1X  .\n\n\ndesired output (tab-delimeted)\n\n R_Index    Chr Start   End Ref Alt Func.IDP.refGene    Gene.IDP.refGene    GeneDetail.IDP.refGene\n4629    chr10   78944590    78944590    G   A   intergenic  NONE;KCNMA1 dist=NONE;dist=451371\n4630    chr10   79396463    79396463    C   T   intronic    KCNMA1  .\n4631    chr10   79397777    79397777    C   -   exonic  KCNMA1;X1X  .\n4633    chr10   89397777    89397777    -   GAA exonic  NONE;X1X;KCNMA1 .\n\n\nawk\n\nawk -F'\\t' 'NR==FNR{a[$0];next} FNR==1{print} {x=$8; sub(/;.*/,\"\",x)} x in a{$1=++c; print}' gene file > out\n\n    ",
    title: "awk to filter file using another capturing all instances",
    id: 93,
    PostTypeId: 1,
    bounty: 0.2954566941717389,
    UserId: 55,
    viewCount: 3,
    upvoteCount: 15,
    comments: 1
  },
  {
    body:
      "\nFor the single gene, just pass as a variable\n\n$ awk -v gene='KCNMA1' -v d=';' 'NR==1 || d $8 d ~ d gene d' file \n\n\nthe counter you're using seems unnecessary since you want to have the first field.\n\nIf you want to support a file based gene list, you can use this\n\n$ awk -v d=';' 'NR==FNR {genes[$0]; next} \n                FNR==1; \n                        {for(g in genes) \n                           if(d $8 d ~ d g d) print}' genes file\n\n    ",
    id: 94,
    PostTypeId: 2,
    PostId: 93,
    bounty: 0.2954566941717389,
    UserId: 44,
    upvoteCount: 33
  },
  {
    body:
      "\n\nWhat command line would give me a list of programs each logged in user is executing for a Linux server using bash?\n    ",
    title: "How to what program each logged in user is executing in linux?",
    id: 95,
    PostTypeId: 1,
    bounty: 0.546311849901959,
    UserId: 80,
    viewCount: 8,
    upvoteCount: 22,
    comments: 1
  },
  {
    body:
      "\nYou can use the w command for this.\n\nAs @ivanivan mentioned, a more complete listing can be accomplished using ps, usually coupled with grep to filter out what you don't want.\n    ",
    id: 96,
    PostTypeId: 2,
    PostId: 95,
    bounty: 0.546311849901959,
    UserId: 58,
    upvoteCount: 7
  },
  {
    body:
      "\n\nIm trying to create a \"array collector\" to retrieve data from a huge array without doing foreach loops, and stuff like that time after time. I have no clue where to start so i was wondering if someone knows if there is a package that already has my purposes or that i need something custom made. Can someone help me out with this?\n\nI have a array (see example 1), and if i insert a specific array (see example 2) i want to retrieve al the items that i have selected. For the output please see example 3. Can someone get me started or create something like it? If someone creates this, ill make a github package for it with all credits to the author, cause i think this can help a lot of people!\n\nI am familiar with Laravel Collections but they dont provide any stuff with the method i would like to. \n\nExample 1\n\n$array = [\n        'title'       => 'Product Title',\n        'description' => 'Lorem ipsum item text ',\n        'variants'    => [\n            0 => [\n                'title'       => 'Variant title 1',\n                'description' => 'Lorem variant description',\n                'price'       => [\n                    'price'     => 10,\n                    'price_old' => 14\n                ]\n            ],\n            1 => [\n                'title'       => 'Variant title 2',\n                'description' => 'Lorem variant description',\n                'price'       => [\n                    'price'     => 10,\n                    'price_old' => 14\n                ],\n                'colors'      => [\n                    0 => 'Red',\n                    1 => 'Blue'\n                ]\n            ]\n        ],\n    ];\n\n\nExample 2\n\n$get = [ 'title', 'variants.title', 'variants.price.price', 'variants.colors' ];\n\n\nExample 3\n\n    $array = [\n        'title'       => 'Product Title',\n        'variants'    => [\n            0 => [\n                'title'       => 'Variant title 1',\n                'price'       => [\n                    'price'     => 10,\n                ]\n            ],\n            1 => [\n                'title'       => 'Variant title 2',\n                'price'       => [\n                    'price'     => 10,\n                ],\n                'colors'      => [\n                    0 => 'Red',\n                    1 => 'Blue'\n                ]\n            ]\n        ],\n    ];\n\n    ",
    title: "Create Multidimensional Array collector - PHP",
    id: 97,
    PostTypeId: 1,
    bounty: 0.571423291594864,
    UserId: 2,
    viewCount: 3,
    upvoteCount: 10,
    comments: 2
  },
  {
    body:
      "\nYour best solution would be implementing the RecursiveArrayIterator class\nhttp://php.net/manual/en/class.recursivearrayiterator.php\n    ",
    id: 98,
    PostTypeId: 2,
    PostId: 97,
    bounty: 0.571423291594864,
    UserId: 43,
    upvoteCount: 18
  },
  {
    body:
      "\nSomething like this should do the job. There are 2 loops nested inside each other. The first loop will only iterate count($get) times, and the second by the depth of the element. In the example you gave, there would only be 8 loops total. You could add some error handling if !empty(), etc. I set the array by reference (&) to prevent the array from duplicating in memory in case you get a large dataset.\n\nfunction getValues(&$array, $get) {\n    $outputs = [];\n    foreach ($get as $query) {\n        $query = explode('.', $get);\n        $container &= $array;\n        foreach ($query as $elem) {\n            $container &= $comtainer[$elem];\n        }\n    }\n}\n\n    ",
    id: 99,
    PostTypeId: 2,
    PostId: 97,
    bounty: 0.571423291594864,
    UserId: 49,
    upvoteCount: 15
  },
  {
    body:
      "\n\nI have a listbox on my gui. When I start the programm the first value in the listbox is selected. But the programm only registers a value when you click it first. \nSo is there a way the programm can start my calculation without having to click the first option in the listbox?\n\nMy idea was to set the handle in the Openingfunction, but it wont work out.\n\nHere is my code:\n\nfunction lastfolge_aufbereiten_OpeningFcn(hObject, eventdata, handles, varargin)\n...\n...\nguidata(hObject, handles);\n\n\n\n\nfunction listbox_runden_stelle_Callback(hObject, eventdata, handles)\ncontents=cellstr(get(hObject,'String'));\npopupmenu_runden_stelle=contents(get(hObject,'Value'));\nif (strcmp(popupmenu_runden_stelle,'10'))\n    y=1;\nelseif (strcmp(popupmenu_runden_stelle,'100'))\n    y=2;\nend\nhandles.y=y;\nguidata(hObject, handles); \n\n    ",
    title:
      "Get selected value instantly on listbox without clicking it first GUI",
    id: 100,
    PostTypeId: 1,
    bounty: 0.7187576696116158,
    UserId: 82,
    viewCount: 4,
    upvoteCount: 33,
    comments: 1
  },
  {
    body:
      "\nA quick fix (but not so pretty) could be to call you listbox_runden_stelle_Callback in the Openingfunction with the handle to your popup menu as input.\n\nlistbox_runden_stelle_Callback(handles.listbox_runden_stelle, [], handles)\n\n\n\n\nA more general answer: You can use the CreateFcn that is executed when MATLAB creates the uicontrol (popupmenu). Below is a short example where both CreateFnc and Callback calls the a common evaluation function \n\nfunction PopupMenu()\n\nfigure;\nuicontrol(...\n    'Style', 'popup', ...\n    'String', {'Hello', 'World'}, ...\n    'CreateFcn', @PopupMenuCreateFcn, ... \n    'Callback',  @PopupMenuCallback);\n\nfunction PopupMenuCallback(hObject, ~)\ndisp('In Callback()')\nPopupMenuEvaluate(hObject);\n\nfunction PopupMenuCreateFcn(hObject, ~)\ndisp('In CreateFcn()')\nPopupMenuEvaluate(hObject);\n\nfunction PopupMenuEvaluate(popupMenu)\nfprintf('Evaluated \"%s\" \\n', popupMenu.String{popupMenu.Value})\n\n\n(if you're using an older Matlab version you might have to replace \"~\" with an dummy string and the . (dot) operator with get(...) to get properties)\n\nWhen running this, the CreateFcn is called upon directly, without the user selecting from the menu.\n\n>> PopupMenu\nIn CreateFcn()\nEvaluated \"Hello\" \n\n\nIf user then select 'World'\n\nIn Callback()\nEvaluated \"World\" \n\n\nIf the same things is to be done for both CreateFcn and Callback you could just bind them to the same common function\n\nuicontrol(...\n    'Style', 'popup', ...\n    'String', {'Hello', 'World'}, ...\n    'CreateFcn', @PopupMenuEvaluate, ... \n    'Callback',  @PopupMenuEvaluate);\n\n    ",
    id: 101,
    PostTypeId: 2,
    PostId: 100,
    bounty: 0.7187576696116158,
    UserId: 86,
    upvoteCount: 23
  },
  {
    body:
      '\n\nHow would I go about creating set of divs each having it\'s own background color, but the colors have to be in the gradient range between two given colors. I know how to create a regular gradient background on a div and that is not what I need. I need something like this.\n\nIt doesn\'t have to be CSS and HTML (thought that is ideal). If I need to use some javascript that is ok. Even if I have to use some PHP to accomplish this, that is okay with me.\n\nHere is a visual demonstration of what I need: https://jsfiddle.net/1q6nrow9/\n\nEach div should have it\'s own distinct color. Colors should not bleed through the border of each div.\n\nHere is the sample of the code from fiddle:\n\nThis: no\n<div class="gradient-wrapper"></div>\n\n<div class="wrapper liquid">\n<div class="tile"></div>\n<div class="tile"></div>\n<div class="tile"></div>\n<div class="tile"></div>\n<div class="tile"></div>\n<div class="tile"></div>\n<div class="tile"></div>\n<div class="tile"></div>\n<div class="tile"></div>\n</div>\n\nThis: yes\n<div class="wrapper">\n<!-- <div class="tile tile-01"></div> -->\n<div class="tile tile-02"></div>\n<!-- <div class="tile tile-03"></div> -->\n<div class="tile tile-04"></div>\n<!-- <div class="tile tile-05"></div> -->\n<div class="tile tile-06"></div>\n<!-- <div class="tile tile-07"></div> -->\n<div class="tile tile-08"></div>\n<!-- <div class="tile tile-09"></div> -->\n<div class="tile tile-10"></div>\n<!-- <div class="tile tile-11"></div> -->\n<div class="tile tile-12"></div>\n<!-- <div class="tile tile-13"></div> -->\n<div class="tile tile-14"></div>\n<!-- <div class="tile tile-15"></div> -->\n<div class="tile tile-16"></div>\n<!-- <div class="tile tile-17"></div> -->\n<div class="tile tile-18"></div>\n</div>\n\n\nSome CSS:\n\nbody {\n    padding: 50px;\n}\n.gradient-wrapper {\n    width: 459px;\n    height: 50px;\n    border: 1px solid #333;\n    margin-bottom: -52px;\n    background: -moz-linear-gradient(0deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%); /* ff3.6+ */\n    background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0,255,0,1)), color-stop(100%, rgba(255,0,0,1))); /* safari4+,chrome */\n    background: -webkit-linear-gradient(0deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%); /* safari5.1+,chrome10+ */\n    background: -o-linear-gradient(0deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%); /* opera 11.10+ */\n    background: -ms-linear-gradient(0deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%); /* ie10+ */\n    background: linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%); /* w3c */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#00ff00\', endColorstr=\'#ff0000\',GradientType=1 ); /* ie6-9 */ \n}\n.liquid {\n    margin-bottom: 50px;\n}\n.wrapper {\n    width: 459px;\n    height: 50px;\n    border-left: 1px solid #333;\n    border-top: 1px solid #333;\n    border-bottom: 1px solid #333;\n\n}\n.tile {\n    border-right: 1px solid #333;\n    height: 50px;\n    width: 50px;\n    float: left;\n}\n.tile-01{background: #0DF200;}\n.tile-02{background: #1BE400;}\n.tile-03{background: #29D600;}\n.tile-04{background: #38C700;}\n.tile-05{background: #46B900;}\n.tile-06{background: #54AB00;}\n.tile-07{background: #629D00;}\n.tile-08{background: #708F00;}\n.tile-09{background: #7F8000;}\n.tile-10{background: #8D7200;}\n.tile-11{background: #9B6400;}\n.tile-12{background: #A95600;}\n.tile-13{background: #B74800;}\n.tile-14{background: #C53A00;}\n.tile-15{background: #D42B00;}\n.tile-16{background: #E21D00;}\n.tile-17{background: #F00F00;}\n.tile-18{background: #FE0100;}\n\n    ',
    title: "Create gradient tiles with Css, Html and Javascript",
    id: 102,
    PostTypeId: 1,
    bounty: 0.9555352622568829,
    UserId: 85,
    viewCount: 4,
    upvoteCount: 15,
    comments: 1
  },
  {
    body:
      '\nThis can be done with JavaScript. I\'ve written up some JavaScript functions that use HSL to make a gradient. You can convert to and from HSL if you need to deal with other color spaces, but this should be a good jumping off point. The code snippet formatting is really screwed up. View the easier to parse fiddle here: https://jsfiddle.net/tu47tjb5/1/\n\n\n\nfunction HSLColor(hue, sat, light) {\n  this.hue = hue;\n  this.saturation = sat;\n  this.lightness = light;\n  this.getCSS = function(){\n   return "hsl("+this.hue+","+this.saturation+"%,"+this.lightness+"%)";\n  }\n}\n\nfunction linearInterpolateColor(startColor, endColor, percentage)\n{\n\t\n  var hueDiff = (endColor.hue - startColor.hue) * percentage;\n  var satDiff = (endColor.saturation - startColor.saturation) * percentage;\n  var lightDiff = (endColor.lightness - startColor.lightness) * percentage;\n  return new HSLColor(startColor.hue + hueDiff,startColor.saturation + satDiff, startColor.lightness + lightDiff);\n}\n\nfunction getInterpolationArray(startColor, endColor, steps)\n{\n\tvar interpolArray = [];\n\tfor(var i = 0; i < steps; i++)\n  {\n  \tinterpolArray.push(linearInterpolateColor(startColor, endColor, i/(steps-1)));\n  }\n  return interpolArray;\n}\n\n/**\n Container should be a jquery object\n*/\nfunction generateSteps(startColor, endColor, steps, container)\n{\n\tvar interpolArray = getInterpolationArray(startColor, endColor, steps)\n\t\n  interpolArray.forEach(function(color){\n  \tvar colorBlock = $("<div>").addClass("colorBlock").css(\'background-color\',color.getCSS());\n    container.append(colorBlock);\n  });\n  \n}\n\nvar start = new HSLColor(0, 100, 50);\nvar end = new HSLColor(40, 25, 100);\ngenerateSteps(start, end, 10, $("#container"));\n.colorBlock {\n  width: 50px;\n  height: 50px;\n  display: inline-block;\n}\n<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>\n<div id="container">\n</div>\n\n\n\n    ',
    id: 103,
    PostTypeId: 2,
    PostId: 102,
    bounty: 0.9555352622568829,
    UserId: 51,
    upvoteCount: 28
  },
  {
    body:
      '\n\nI understand we can add code on iOS client side to detect whether the user has disabled push notification permission, my question it, is it possible to do it in only using APN?\n\nI try the "Feedback Service" first, from Apple Programming Guide:\n\n\n  The Apple Push Notification service includes a feedback service to\n  give you information about failed remote notifications. When a remote\n  notification cannot be delivered because the intended app does not\n  exist on the device, the feedback service adds that device’s token to\n  its list. Remote notifications that expire before being delivered are\n  not considered a failed delivery and don’t impact the feedback\n  service. By using this information to stop sending remote\n  notifications that will fail to be delivered, you reduce unnecessary\n  message overhead and improve overall system performance.\n\n\nFeedBack Service payload\n\nSo "Feedback Service" essentially give us a token list for failed push notifications. I tried to send push to a device with disabled push notification permission or app uninstalled , however my device token does not appear in this list.\n\nApple\'s document also mentions we will get immediate response from APN once we send the push notification:\n\n\n  If you send a notification that is accepted by APNs, nothing is\n  returned. If you send a notification that is malformed or otherwise\n  unintelligible, APNs returns an error-response packet and closes the\n  connection. Any notifications that you sent after the malformed\n  notification using the same connection are discarded, and must be\n  resent. Figure A-2 shows the format of the error-response packet.\n\n\nHowever, it seems like the returned status stays the same no matter what I do: enable/disable push notification permission or even uninstall the app...\n\nI fact, my hypothesis is that even the user has disabled the push notification, APN will still see it as a successful delivery, but iOS just simply don\'t show it.  None of them response code from APN seem to be related to the disabled push notification. \n\nI am wondering if there is a way to do it with APN? Thank you! \n\nReference: Apple Doc:https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/BinaryProviderAPI.html#//apple_ref/doc/uid/TP40008194-CH13-SW1\n    ',
    title:
      "Detect whether the user has disable push notification permission from APN",
    id: 104,
    PostTypeId: 1,
    bounty: 0.22909390514293215,
    UserId: 76,
    viewCount: 4,
    upvoteCount: 17,
    comments: 0
  },
  {
    body:
      '\n\nI have a model:\n\ndefmodule VideoChat.User do\n  use VideoChat.Web, :model\n\n  schema "users" do\n    field :device_identifier, :string\n    field :matches, :map\n\n    timestamps()\n  end\n\n  ...\nend\n\n\nHow would I look for all users with a "cool" key in their matches hash?\n\nUser |> where([u], u.matches["cool"] != nil) |> limit(1) |> VideoChat.Repo.one\n    ',
    title: "Ecto + Elixir: How do I query a hashmap field?",
    id: 105,
    PostTypeId: 1,
    bounty: 0.13700164309184193,
    UserId: 15,
    viewCount: 4,
    upvoteCount: 8,
    comments: 1
  },
  {
    body:
      '\n:map fields are stored as JSONB fields in PostgreSQL by Ecto. Ecto does not provide any functions to do map specific operations on such fields, but it can be done using fragment and custom SQL.\n\nThe SQL query foo.bar ? \'baz\' will check if the column bar of foo contains a value in the key "baz". This can be expressed with fragment like this:\n\nfragment("? \\\\? ?", foo.bar, "baz")\n\n\nSo your code should be modified to:\n\nUser |> where([u], fragment("? \\\\? ?", u.matches, "cool")) |> limit(1) |> VideoChat.Repo.one\n\n\nIn a brand new Map model with key map of type :map:\n\niex(1)> Repo.insert! %MyApp.Map{map: %{}}\niex(2)> Repo.insert! %MyApp.Map{map: %{foo: 1}}\niex(3)> Repo.insert! %MyApp.Map{map: %{foo: 2}}\niex(4)> Repo.insert! %MyApp.Map{map: %{bar: 1}}\niex(5)> Repo.all MyApp.Map |> where([m], fragment("? \\\\? ?", m.map, "foo"))\n[debug] QUERY OK source="maps" db=1.8ms decode=5.3ms\nSELECT m0."id", m0."map", m0."inserted_at", m0."updated_at" FROM "maps" AS m0 WHERE (m0."map" ? \'foo\') []\n[%MyApp.Map{__meta__: #Ecto.Schema.Metadata<:loaded, "maps">, id: 2,\n  inserted_at: #Ecto.DateTime<2016-12-07 10:19:53>, map: %{"foo" => 1},\n  updated_at: #Ecto.DateTime<2016-12-07 10:19:53>},\n %MyApp.Map{__meta__: #Ecto.Schema.Metadata<:loaded, "maps">, id: 3,\n  inserted_at: #Ecto.DateTime<2016-12-07 10:19:55>, map: %{"foo" => 2},\n  updated_at: #Ecto.DateTime<2016-12-07 10:19:55>}]\niex(6)> Repo.all MyApp.Map |> where([m], fragment("? \\\\? ?", m.map, "bar"))\n[debug] QUERY OK source="maps" db=2.9ms queue=0.2ms\nSELECT m0."id", m0."map", m0."inserted_at", m0."updated_at" FROM "maps" AS m0 WHERE (m0."map" ? \'bar\') []\n[%MyApp.Map{__meta__: #Ecto.Schema.Metadata<:loaded, "maps">, id: 4,\n  inserted_at: #Ecto.DateTime<2016-12-07 10:19:59>, map: %{"bar" => 1},\n  updated_at: #Ecto.DateTime<2016-12-07 10:19:59>}]\niex(7)> Repo.all MyApp.Map |> where([m], fragment("? \\\\? ?", m.map, "baz"))\n[debug] QUERY OK source="maps" db=2.2ms queue=0.1ms\nSELECT m0."id", m0."map", m0."inserted_at", m0."updated_at" FROM "maps" AS m0 WHERE (m0."map" ? \'baz\') []\n[]\n\n    ',
    id: 106,
    PostTypeId: 2,
    PostId: 105,
    bounty: 0.13700164309184193,
    UserId: 36,
    upvoteCount: 15
  },
  {
    body:
      "\n\nI run Python script on Windows using IDE PyCharm.\n\nSometimes process is stopped. How can I configure that process will be re-run automatically after interruption?\n    ",
    title: "How to re-run process python in Windows/Linux?",
    id: 107,
    PostTypeId: 1,
    bounty: 0.8085161987210092,
    UserId: 89,
    viewCount: 2,
    upvoteCount: 31,
    comments: 1
  },
  {
    body:
      "\nThere is also 3 ways as in this answer.\n\n1 way create infinity batch loop\n\n:loop\npython your_script.py\ngoto loop\n\n\n2  and 3rd way are already described here.\nAlso you can start python script as windows service but it much harder.\n    ",
    id: 108,
    PostTypeId: 2,
    PostId: 107,
    bounty: 0.8085161987210092,
    UserId: 80,
    upvoteCount: 20
  },
  {
    body:
      '\n\nI\'m trying to access a value that I\'ve passed by reference into a thread that will run until the end of the program. I want to perform some operations on this value and then pass it by reference to another thread. \n\nI\'ve looked into thread futures but I\'m not sure that suits my purpose as I need constant updates on the value. If I just use normal mutexes, my operation never gets called due to blocking by the other threads accessing the value. (this is why I\'ve used the atomic bool flag for the functions in the class). Any advice on how exactly to proceed? Here\'s my code.\n\nmain program \n\n#include "sock_send.h" \n#include <thread>\n#include <functional>\n#include <iostream>\n#include <atomic>\n\nextern std::mutex some_other_mutex;\n\nint main(){\n\n    int portno[4] = {55011, 55016, 55021, 55026};\n    std::vector <double> data_r(6), data_l(6);\n    std::atomic <bool> flag1(false), flag2(false);\n\n    sock_send newsocket1;   \n    sock_send newsocket3;\n\n    newsocket1.startsocket(portno[0]);  \n    newsocket3.startsocket(portno[2]);\n\n    std::thread t1 (&sock_send::readsocket, &newsocket1, std::ref(data_r), std::ref(flag1));    \n\n\n// do some operation on data_r, say data_l = data_r/10;\n\n    std::thread t3 (&sock_send::writesocket, &newsocket3, std::ref(data_l), std::ref(flag1));\n\n    t1.join();  \n\n    t3.detach();    \n\n    return 0;\n\n}\n\n\nsock_send.h\n\n#ifndef SOCK_SEND_H\n#define SOCK_SEND_H\n\n#include <functional>\n#include <stdio.h>\n#include <sys/types.h> \n#include <sys/socket.h>\n#include <netinet/in.h>\n#include <stdlib.h>\n#include <iostream>\n#include <unistd.h>\n#include <errno.h>\n#include <string.h>\n#include <sys/epoll.h>\n#include <mutex>\n#include <vector>\n#include <thread>\n#include <atomic>\n\nextern std::mutex some_other_mutex;\n\nclass sock_send\n{\npublic:\n\n    void startsocket (int portno);\n    void writesocket(std::vector<double> & data_o, std::atomic <bool> &flag);\n    void readsocket(std::vector<double> & data_in, std::atomic <bool> &flag);\n    ~sock_send();\n\nprivate:\n    struct sockaddr_in serv_addr, cli_addr;\n    int n, epfd, sockfd, yes=1, newsockfd = 0, nbytess,\n    clilen = sizeof(cli_addr);\n    // define epoll event structs\n    struct epoll_event event, *events = new epoll_event;\n};\n#endif\n\n\nsock_send.cc\n\n#include "sock_send.h"\n\nstd::mutex some_other_mutex;\n\nvoid sock_send::startsocket (int portno){\n\n    //create an epoll file descriptor\n        if ((epfd = epoll_create1(0)) == -1)\n        std::cout << "Error on epoll create\\t" << errno << std::endl;\n\n    //create the socket file descriptor\n    if ((sockfd = socket(AF_INET, SOCK_STREAM | SOCK_NONBLOCK, 0)) == -1) \n        std::cout << "Error on socket create\\t" << errno << std::endl;\n\n        // get rid of annoying port in use\n    if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof yes) == -1) \n        std::cout << "Error on socket reuse option\\t" << errno << std::endl;\n\n    // fill up serv addr with zeros\n        bzero((char *) &serv_addr, sizeof(serv_addr));\n\n        //enter data in serv addr\n        serv_addr.sin_family = AF_INET;\n    serv_addr.sin_port = htons(portno);\n    serv_addr.sin_addr.s_addr = INADDR_ANY;\n\n    // bind port and ip to socket 1\n    if ((bind(sockfd, (struct sockaddr *) &serv_addr, sizeof(serv_addr))) == -1) \n        std::cout << "Error on binding sock\\t" << errno << std::endl;\n\n        //start listening on socket           \n    if ((listen(sockfd,100))==-1)\n        std::cout << "Error on listen sock\\t" << errno << std::endl;\n\n    // socket epoll control\n    event.data.fd = sockfd;\n    event.events = EPOLLIN;\n\n    if ((epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &event)) == -1) \n        std::cout << "Error on epoll ctl sock\\t" << errno << std::endl;\n\n        while (newsockfd == 0){     \n\n        // wait for an event using epoll\n            if ((n = epoll_wait (epfd, events, 20, -1)) == -1){\n            std::cout << "Error on epoll wait\\t" << errno << std::endl;\n            continue;\n        }\n        if (sockfd == events[0].data.fd){   \n\n            // accept incoming connection\n                if ((newsockfd = accept(sockfd, (struct sockaddr *) &cli_addr,(socklen_t*)&clilen)) == -1){\n                std::cout << "Error on accept\\t " << errno << std::endl;\n                continue;\n            }\n            event.data.fd = newsockfd;                  \n            event.events = EPOLLIN;\n                if ((epoll_ctl (epfd, EPOLL_CTL_ADD, newsockfd, &event)) == -1){\n                std::cout << "Error on epoll cntl" << errno << std::endl;\n                continue;\n            }\n            break;\n        }\n\n        else\n            std::cout << "Epoll returning some other socket \\t" << events[0].data.fd << std::endl;\n    }\n}\n\nvoid sock_send::readsocket(std::vector<double> & data_in, std::atomic <bool> &flag){\n    while (1){  \n\n        // wait for an event using epoll\n            if ((n = epoll_wait (epfd, events, 20, 0)) == -1){\n            std::cout << "Error on epoll wait\\t" << errno << std::endl;\n            continue;\n        }\n\n\n        //if newsock connections available\n        if ((newsockfd == events[0].data.fd) & (flag ==false)){\n            std::unique_lock<std::mutex> lck (some_other_mutex);\n            nbytess = recv(events[0].data.fd, data_in.data() , (sizeof data_in[0])*(data_in.size()), 0);\n            lck.unlock();\n            flag = true;\n            if (nbytess == -1){\n                std::cout << "Error during read: " << errno << std::endl;\n                break;\n            }\n\n            if (nbytess == 0){\n                std::cout << "End of data from this socket" << std::endl;\n                break;\n            }    \n        }\n    }\n}\n\n\nvoid sock_send::writesocket(std::vector<double> & data_o, std::atomic <bool> &flag){\n    while(1){ \n        if (flag == true ){\n            std::unique_lock<std::mutex> lck (some_other_mutex);\n            nbytess = send(newsockfd, data_o.data(),(sizeof data_o[0])*(data_o.size()), 0);\n            lck.unlock();\n            flag =false;\n            if (nbytess == -1){\n                if (errno == 104)\n                    std::cout << "Connection Closed" << std::endl;\n                else\n                    std::cout << "Error during write: " << errno << std::endl;\n            }\n        }\n    }\n}\n\nsock_send::~sock_send()\n{   \n    delete events;\n    close (sockfd);\n}\n\n\n<<<<<<<<<<< edit: new single thread code>>>>>>>>>>>>>>>>\n\nmain\n\n#include "sock_send.h" \n#include <functional>\n#include <iostream>\n#include <chrono>\n#include <thread>\n\nint main(){\n\n    int portno[2] = {55011, 55021};\n    std::vector<double> data_mod(6);\n\n    sock_send newsocket1;   \n\n    newsocket1.startsocket(portno,2);   \n\n    for (double i=0; i<9993999; i++){\n        newsocket1.read(data_mod);\n        std::this_thread::sleep_for(std::chrono::nanoseconds(1)); \n        newsocket1.write(data_mod);\n    }       \n\n    return 0;\n\n}\n\n\nsock_send.h\n\n#ifndef SOCK_SEND_H\n#define SOCK_SEND_H\n\n#include <functional>\n#include <stdio.h>\n#include <sys/types.h> \n#include <sys/socket.h>\n#include <netinet/in.h>\n#include <stdlib.h>\n#include <iostream>\n#include <unistd.h>\n#include <errno.h>\n#include <string.h>\n#include <sys/epoll.h>\n#include <mutex>\n#include <vector>\n\nclass sock_send\n{\npublic:\n\n    void startsocket (int * portno, int np);\n    void read(std::vector<double> &data_in);\n    void write(std::vector<double> &data_o);\n    ~sock_send();\n\nprivate:\n    struct sockaddr_in serv_addr[2], cli_addr[2];\n    int n[2], epfd[2], sockfd[2], yes=1, newsockfd[2] = {0,0}, nbytess[2],\n    clilen[2] = {sizeof(cli_addr[0]), sizeof(cli_addr[1])};\n    // define epoll event structs\n    struct epoll_event event[2], *events[2] = {new epoll_event, new epoll_event};\n};\n#endif\n\n\nsock_send.cc\n\n#include "sock_send.h"\n\nvoid sock_send::startsocket (int *portno, int np){\n\nfor (int i = 0; i <np; i++){\n    //create an epoll file descriptor\n        if ((epfd[i] = epoll_create1(0)) == -1)\n        std::cout << "Error on epoll create\\t" << errno << std::endl;\n\n    //create the socket file descriptor\n    if ((sockfd[i] = socket(AF_INET, SOCK_STREAM | SOCK_NONBLOCK, 0)) == -1) \n        std::cout << "Error on socket create\\t" << errno << std::endl;\n\n        // get rid of annoying port in use\n    if (setsockopt(sockfd[i], SOL_SOCKET, SO_REUSEADDR, &yes, sizeof yes) == -1) \n        std::cout << "Error on socket reuse option\\t" << errno << std::endl;\n\n    // fill up serv addr with zeros\n        bzero((char *) &serv_addr[i], sizeof(serv_addr[i]));\n\n        //enter data in serv addr\n        serv_addr[i].sin_family = AF_INET;\n    serv_addr[i].sin_port = htons(portno[i]);\n    serv_addr[i].sin_addr.s_addr = INADDR_ANY;\n\n    // bind port and ip to socket 1\n    if ((bind(sockfd[i], (struct sockaddr *) &serv_addr[i], sizeof(serv_addr[i]))) == -1) \n        std::cout << "Error on binding sock\\t" << errno << std::endl;\n\n        //start listening on socket           \n    if ((listen(sockfd[i],100))==-1)\n        std::cout << "Error on listen sock\\t" << errno << std::endl;\n\n    // socket epoll control\n    event[i].data.fd = sockfd[i];\n    event[i].events = EPOLLIN;\n\n    if ((epoll_ctl(epfd[i], EPOLL_CTL_ADD, sockfd[i], &event[i])) == -1) \n        std::cout << "Error on epoll ctl sock\\t" << errno << std::endl;\n\n        while (newsockfd[i] == 0){  \n\n        // wait for an event using epoll\n            if ((n[i] = epoll_wait (epfd[i], events[i], 20, -1)) == -1){\n            std::cout << "Error on epoll wait\\t" << errno << std::endl;\n            continue;\n        }\n        if (sockfd[i] == events[i][0].data.fd){ \n\n            // accept incoming connection\n                if ((newsockfd[i] = accept(sockfd[i], (struct sockaddr *) &cli_addr[i],(socklen_t*)&clilen[i])) == -1){\n                std::cout << "Error on accept\\t " << errno << std::endl;\n                continue;\n            }\n            event[i].data.fd = newsockfd[i];                    \n            event[i].events = EPOLLIN;\n                if ((epoll_ctl (epfd[i], EPOLL_CTL_ADD, newsockfd[i], &event[i])) == -1){\n                std::cout << "Error on epoll cntl" << errno << std::endl;\n                continue;\n            }\n            break;\n        }\n\n        else\n            std::cout << "Epoll returning some other socket \\t" << events[i][0].data.fd << std::endl;\n    }\n}\n}\n\nvoid sock_send::read(std::vector<double> &data_in){\n    // wait for an event using epoll\n        if ((n[0] = epoll_wait (epfd[0], events[0], 20, 0)) == -1){\n        std::cout << "Error on epoll wait\\t" << errno << std::endl;\n    }\n\n\n    //if newsock connections available\n    if ((newsockfd[0] == events[0][0].data.fd)){\n        nbytess[0] = recv(events[0][0].data.fd, data_in.data() , (sizeof data_in[0])*(data_in.size()), 0);\n        if (nbytess[0] == -1){\n            std::cout << "Error during read: " << errno << std::endl;\n        }\n\n        if (nbytess[0] == 0){\n            std::cout << "End of data from this socket" << std::endl;\n        }\n        //std::cout << data_in[0] << std::endl;\n    }\n}\n\nvoid sock_send::write(std::vector<double> &data_o){\n        std::cout << data_o[0] << std::endl;        \n    nbytess[1] = send(newsockfd[1], data_o.data(),(sizeof data_o[0])*(data_o.size()), 0); \n    if (nbytess[1] == -1){\n        if (errno == 104)\n            std::cout << "Connection Closed" << std::endl;\n        else\n            std::cout << "Error during write: " << errno << std::endl;\n    }\n}\n\nsock_send::~sock_send()\n{   \n    delete events[0], events[1];\n    close (sockfd[0]);\n    close (sockfd[1]);\n}\n\n    ',
    title: "Accessing a value passed by reference into a thread in c++11",
    id: 109,
    PostTypeId: 1,
    bounty: 0.7026045289810512,
    UserId: 35,
    viewCount: 6,
    upvoteCount: 30,
    comments: 0
  },
  {
    body:
      '\n\nThe code I am using is shown here:\n\nimport os.path\n\ndef def1():\n    global filename\n    if os.path.isfile(filename+ ".txt") == True:\n        print ("Filename exists")\n    if os.path.isfile(filename+ ".txt") == False:\n        print("Filename dosent exist")\n\ndef def2():\n    global filename\n    filename = input("Please input the name if the file you want to see exists")\n\ndef Main():\n    def1()\n    def2()\n\nMain()\n\n\nWhat the code does is check whether or not a file exists, and the user can input the name of the file he/she wishes to check. This code will be used in a much bigger code file. I am not able to understand why I get this error when I run the code:\n\nTraceback (most recent call last):\n File "/Users/Sid/Desktop/existfiletest.py", line 18, in <module>\n  Main()\n File "/Users/Sid/Desktop/existfiletest.py", line 15, in Main\n  def1()\n File "/Users/Sid/Desktop/existfiletest.py", line 5, in def1\n  if os.path.isfile(filename+ ".txt") == True:\nNameError: name \'filename\' is not defined\n\n\nI have defined the variable \'filename\' as a global in def2(), but I start off the program by calling def1(). The variable \'filename\' is a global, so I don\'t see why it can\'t be used in def1(). And also, if anyone says to call def2() first, yes that works. However I would like to know whether I can use a variable before defining it, as this is the case in my bigger code. \n\nThanks in advance.\n    ',
    title:
      "Can I use a global variable at the start of my code when I have defined it at the end of my program?",
    id: 110,
    PostTypeId: 1,
    bounty: 0.690884891225924,
    UserId: 78,
    viewCount: 3,
    upvoteCount: 37,
    comments: 3
  },
  {
    body:
      '\nSort answer:\n\nreplace:\n\n    def Main():\n       def1()\n       def2()\n\n\nby\n\n    def Main():\n       def2()\n       def1()\n\n\nYour mistake is not the fact that you defined the global variable earlier in the file. But by calling def1 first, you have left the variable undefined. So you must call def2 first to initialize and give it a value. \n\nSecondly you do not need to perform the if test twice:\n\n def def1(filename):\n     if os.path.isfile(filename+ ".txt") == True:\n          print ("Filename exists")\n     else:\n          print("Filename does not exist")\n\n    ',
    id: 111,
    PostTypeId: 2,
    PostId: 110,
    bounty: 0.690884891225924,
    UserId: 92,
    upvoteCount: 7
  },
  {
    body:
      '\nDon\'t use global variables. It is really bad practice. Use function arguments. You can change you code to:\n\nimport os.path\n\ndef def1(filename):\n    if os.path.isfile(filename+ ".txt") == True:\n        print ("Filename exists")\n    if os.path.isfile(filename+ ".txt") == False:\n        print("Filename dosent exist")\n\ndef def2():\n    return input("Please input the name if the file you want to see exists")\n\ndef Main():\n    filename = def2()\n    def1(filename)\n\nMain()\n\n\nAnd of course you can\'t use variable before defining it. But you can define it with some default value.\n    ',
    id: 112,
    PostTypeId: 2,
    PostId: 110,
    bounty: 0.690884891225924,
    UserId: 26,
    upvoteCount: 24
  },
  {
    body:
      '\nSave the filename in the main function and then pass it to the def1 function like so:\n\nimport os.path\n\ndef def1(filename):\n    if os.path.isfile(filename+ ".txt") == True:\n        print ("Filename exists")\n    if os.path.isfile(filename+ ".txt") == False:\n        print("Filename dosent exist")\n\ndef Main():\n    filename = input("Please input the name if the file you want to see exists")\n    def1(filename)\n\nMain()\n\n    ',
    id: 113,
    PostTypeId: 2,
    PostId: 110,
    bounty: 0.690884891225924,
    UserId: 55,
    upvoteCount: 26
  },
  {
    body:
      "\n\nWhen I am accessing a meeting URI using the GuestmeetingJoin sample app, I am getting the following error. \n\nSfbCertificateTrustEngine: Certificate NOT trusted by the standard OS trust manager: X509CertificateInfo\n\nHow can I make the library to trust the certificate. What makes the app sdk to trust our certificate. The certificate issued by our CA is not leading to a publicly trusted entity. But we want to try it for Proof of concept for now. I am trying this on Android. \n    ",
    title: "Certificate trust issue on Skype for business App sdk",
    id: 114,
    PostTypeId: 1,
    bounty: 0.5420369464730523,
    UserId: 54,
    viewCount: 9,
    upvoteCount: 11,
    comments: 1
  },
  {
    body:
      "\nThis is not a programing problem but a device setup problem.\n\nThe device but have the root certificate (and intermediate certificates) installed into the devices trusted root certificates list.\n\nIf your sfb uses a self-signed certificate (which will be my guess) then you need to get and install this self-signed certificate onto the device.  How this is done may be different for different devices (PC, Mac, IPhone, IPad, Andriod, etc).  See this question on how to install a certificate onto a android device.\n    ",
    id: 115,
    PostTypeId: 2,
    PostId: 114,
    bounty: 0.5420369464730523,
    UserId: 65,
    upvoteCount: 35
  },
  {
    body:
      "\n\nI have a LED-board which is powered with python.\nTo turn on the LED's a script has to continue running. But how do I influence the color variables of a running script?\n\nI could read an sql(lite?) db, read the values of a file. Get values of some rest api. Or maybe something completely else.\n\nWhat is the most neat way to do this?\nI'm new to python so feel free to point out I'm completely doing it wrong. \nOr provide alternative.\nPlease do provide sample code which I could follow.\n\n#!/usr/bin/env python\n\nimport time\n\nimport unicornhat as unicorn\n\nunicorn.set_layout(unicorn.AUTO)\nunicorn.rotation(0)\nunicorn.brightness(0.3)\n\ncount = 0\nwhile True:\n\n    # somehow change these color values\n    # syqlite? reading a file? rest requesting some url? or some signal? how to do this?\n    color=[\n        [255,0,0], #red\n        [255,255,0], #yellow\n        [0,255,0], #green\n        [0,255,255], #light blue\n        [0,0,255], # blue\n        [255,0,255], #purple\n        [255,255,255], #white\n        [0,0,0], #off\n    ]\n\n\n    unicorn.clear()\n\n    for y in xrange(8):\n\n        # make it \"scroll\"\n        row = y+count\n        if row>7:\n            row -= 8\n\n        for x in xrange(8):\n            unicorn.set_pixel(y, x, color[row][0], color[row][1], color[row][2])\n\n\n    unicorn.show()\n    if count == 7:\n        count = 0\n    else:\n        count = count + 1\n\n    time.sleep(0.2)\n\n    ",
    title: "How to change values of a running pi script",
    id: 116,
    PostTypeId: 1,
    bounty: 0.7274618752179993,
    UserId: 98,
    viewCount: 5,
    upvoteCount: 19,
    comments: 0
  },
  {
    body:
      "\n\nJQUERY UPDATE\n\n<script type=\"text/javascript\">\n\n                    jQuery(function($){\n\n                            function fetchBlogPosts(){\n\n                                 $.post( ajaxUrl, {'action' : 'post_blog', \n                                                   'security' :'<?php echo wp_create_nonce('load_more_posts'); ?>' }, \n                                 function(response){\n\n                                 });\n\n\n                             }\n\n                             $('.load-more').click(function(){\n                                 fetchBlogPosts();\n                             });\n\n                        });\n\n</script>\n\n\nPHP FUNCTION UPDATE\n\nadd_action('wp_ajax_post_blog', 'blog_post_data_fetch');\nadd_action('wp_ajax_nopriv_post_blog', 'blog_post_data_fetch');\nfunction blog_post_data_fetch(){\n\n    check_ajax_referer('load_more_posts', 'security');\n\n    ob_clean();\n    get_template_part( 'inc/blog','posts' );\n\n    wp_die();\n}\n\n\nAfter reading several AJAX tutorials and honestly AJAX with WordPress still confuses me :( I'm stuck with the following code which does work. \n\nHowever, I would just like it to add additional posts to an existing loop and not repeat the same posts.\n\nSo in other words, the initial the page loads the loop below and then when I click on the \".load-more\" button it should load more posts via AJAX but offset it by the existing posts already being displayed. \n\nHow is this possible to do? \n\nFUNCTIONS.PHP\n\nadd_action('wp_ajax_post_blog', 'blog_post_data_fetch');\nadd_action('wp_ajax_nopriv_post_blog', 'blog_post_data_fetch');\nfunction blog_post_data_fetch(){\n    get_template_part('inc/blog','posts');\n}\n\n\nBLOG POSTS TEMPLATE\n\n<?php\n\n    $the_query = new WP_Query( array(\n        'post_type' => 'blog',\n    ));\n\n    if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post();\n\n\n?>\n\n\n<div class=\"carousel-cell\">\n    <div class=\"blog-item\">\n\n        <div class=\"featured-image\">\n            <a href=\"<?php the_permalink(); ?>\">\n\n                <?php\n                    if ( has_post_thumbnail() ) :\n                        the_post_thumbnail('blog-thumb');\n                    else :\n                ?>\n                    <img src=\"<?php bloginfo('template_url'); ?>/img/blog-thumb.jpg\" alt=\"\">\n\n                <?php endif; ?>\n\n            </a>\n        </div><!--/featured-image-->\n\n        <div class=\"post\">\n\n            <h1><a href=\"#\"><?php the_title(); ?>hello</a></h1>\n\n            <?php the_excerpt(); ?>\n\n        </div><!--/post-->\n\n\n    </div><!--/blog-item-->\n</div><!--/carousel-cell-->\n\n<?php endwhile; endif; ?>\n\n\nJQUERY\n\n function fetchBlogPosts(){\n\n          $.post( ajaxUrl, { 'action' : 'post_blog' }, function(response){\n\n          });\n  }\n\n      $('.load-more').click(function(){\n          fetchBlogPosts();\n      });\n\n    ",
    title: "WordPress, How Do I AJAX Additional Posts",
    id: 117,
    PostTypeId: 1,
    bounty: 0.006029007491694882,
    UserId: 30,
    viewCount: 3,
    upvoteCount: 1,
    comments: 1
  },
  {
    body:
      "\nYou need to add wp_die() or die() to the end of your PHP callback.  PHP needs to know that it's done processing.  Also, the nopriv event is not correct.\n\nadd_action('wp_ajax_post_blog', 'blog_post_data_fetch');\nadd_action('wp_ajax_nopriv_post_blog', 'blog_post_data_fetch');\n/**\n * Processes the Ajax request for the action: post_blog.\n *\n * @since 1.0.0\n *\n * @return void\n */\nfunction blog_post_data_fetch(){\n    // You need to check the nonce here first!\n    // Let's keep our web pages safe.\n\n    // Then if the nonce is correct, you can do the\n    // processing.\n    ob_clean();\n    get_template_part( 'inc/blog','posts' );\n\n    // When you're done, make sure you exit PHP\n    wp_die();\n}\n\n\nExplaining AJAX and WordPress\n\nLet me explain what's happening.\n\nThe server has processed the business logic, built the HTML markup and assets, and then sent them out to the browser.  The server is now done.  \n\nAJAX gives you the means to call back to the server and have it do more processing for you.  The cycle is:\n\n\nAJAX posts back to the server\nServer receives the request\nYou check the nonce to make sure it's a valid request\nThen you do some processing\nPackage up the return and send it back to the request\nYour script receives the response and continues.\n\n\nIn your case, you make the call back to the server with $.post. WordPress receives the request and then fires 2 events:\n\n\nwp_ajax_{your ajax action}\nwp_ajax_nopriv_{your ajax action}\n\n\nThe first event fires and gives access if the user is logged in.  The second one (i.e. nopriv) fires regardless if they are logged in or not.\n\nWordPress then runs your callback that you registered to the above event names.  Your example callback is blog_post_data_fetch().\n\nNow in your code, you need to add nonce check to keep it safe. If that passes, then you can process the request.  If you are returning a string, you can echo that out (or just call the view/template file).  If it's an array, then you need to serialize it, e.g. json_encode.\n\nPHP is done when it executes the die() or wp_die() construct.  \n\nNow the response is sent back to jQuery. $.post receives the response.  Now you can do something with it.\n\nIn your case, your sending back some HTML markup.  You'll want to decide where to add this markup into the web page.\n\nTutorials on AJAX\n\nThere are a lot of tutorials available to you on WordPress' implementation of AJAX:\n\n\nAjax in Plugins by Codex\nProcess Ajax Request by Pippins\nImproved Ajax Techniques by Tom McFarlin\n\n\nCompleting the Code\n\nI gave you the code for the PHP side (minus the nonce security check). Next, you'll need to add the following into the jQuery script:\n\n\nsend the security check (nonce)\nprocess the response by adding it into the web page where you want if you get a string back\n\n\nAlso make sure that you are localizing the parameters by sending the AJAX URL (and maybe nonce) from WordPress to your script.\n    ",
    id: 118,
    PostTypeId: 2,
    PostId: 117,
    bounty: 0.006029007491694882,
    UserId: 78,
    upvoteCount: 2
  },
  {
    body:
      "\n\nI want to customize color for NSLinkAttributeName in UILabel. But setting NSForegroundColorAttributeName not affect link text color, it still blue.\n\nBut NSUnderlineColorAttributeName works and I was able to customize underline color. Is it possible to change link text color somehow?\n    ",
    title: "Customize color for NSLinkAttributeName in UILabel",
    id: 119,
    PostTypeId: 1,
    bounty: 0.6783510042620915,
    UserId: 54,
    viewCount: 7,
    upvoteCount: 16,
    comments: 1
  },
  {
    body:
      '\nI also had same issue when I tried to customize UILabel, and I figured, that NSLinkAttributeName has bigger priority than NSForegroundColorAttributeName. Or, maybe, NSLinkAttributeName processed after foreground color. \n\nI ended with cycle through all NSLinkAttributeName and replace it with my custom attribute with name CustomLinkAttribute. After that it works like a charm. And I was also able to get link, by accessing to my custom attribute\n\nfunc setupHtmlLinkTextStyle(attributedString: NSAttributedString) -> NSAttributedString {\n    let updatedString = NSMutableAttributedString(attributedString: attributedString)\n    attributedString.enumerateAttribute(NSLinkAttributeName,\n                                        in: NSRange(location: 0, length: attributedString.length),\n                                        options: [],\n                                        using:\n        {(attribute, range, stop) in\n            if attribute != nil {\n                var attributes = updatedString.attributes(at: range.location, longestEffectiveRange: nil, in: range)\n                attributes[NSForegroundColorAttributeName] = UIColor.green\n                attributes[NSUnderlineColorAttributeName] = UIColor.green\n                attributes[NSStrokeColorAttributeName] = UIColor.green\n                attributes["CustomLinkAttribute"] = attribute!\n                attributes.removeValue(forKey: NSLinkAttributeName)\n                updatedString.setAttributes(attributes, range: range)\n            }\n    })\n    return updatedString\n}\n\n    ',
    id: 120,
    PostTypeId: 2,
    PostId: 119,
    bounty: 0.6783510042620915,
    UserId: 26,
    upvoteCount: 21
  },
  {
    body:
      "\n\nI am trying to debug this game I am making. Something is wrong with the for loops and I do not know what it is; essentially I am trying to get my rectangles to spawn on the canvas after the user clicks ready. What are some ways to debug logic errors? Doing this over khanacademy. \n\nWhen I println the drawRects function. Console says infinite loop and points to my for loops.\n\n\nWhen I click ready, the console increases by 1 each time so I know the levelUp function is working.\n\n\n\nI cant post another link because not enough rep, but when I println randomRects, nothing appears on the console.\n\nTherefore, I believe it is safe to assume something is wrong with my for loops, because the levelUp function works but the random rectangles are not appearing. What are other debugging techniques I can use to narrow down the problem?\n    ",
    title: "How to debug or narrow down logic errors?",
    id: 121,
    PostTypeId: 1,
    bounty: 0.48466166677958733,
    UserId: 93,
    viewCount: 8,
    upvoteCount: 34,
    comments: 1
  },
  {
    body:
      '\nYou debug a problem by finding out exactly what the code is doing.\n\nThere are a few ways to do that:\n\nUse your head. This is your first line of defense. Run through the code in your head, or better yet with a piece of paper and a pencil. Use some example values for your input, and walk through line by line and see what the code would do. Talk out loud, write stuff down, and do this over and over again. This is a huge part of being a programmer.\n\nUse a console. Processing has a println() function that should go to your JavaScript console in your browser. This is your new best friend. Print out the values of any variables you want to know about, like this:\n\nprintln("x: " + x);\n\n\nOr a simple println("here") inside an if statement can tell you whetehr that if statement is executing. Combine this with approach one to really check all of your assumptions.\n\nUse a debugger. If all else fails, step through your code with a debugger. This is basically using a computer to do the first two approaches.\n\nIn reality, you\'ll use a combination of all of the above to debug a problem. But the basic idea is this: you need to understand what your code is doing. You do that by first running through the code in your head or on a piece of paper, and you test any assumptions or anything you aren\'t sure by printing stuff out.\n    ',
    id: 122,
    PostTypeId: 2,
    PostId: 121,
    bounty: 0.48466166677958733,
    UserId: 27,
    upvoteCount: 37
  },
  {
    body:
      "\n\nThe number of actual threads used by FFmpeg do not line up with the number I pass using the -threads argument.\n\nI've run tests on both my MacBook Air, which has 4 cores, and a VM I have which has 2 cores. The number of threads used are consistent across both machines.\n\nUsing a single thread returns what I would expect: 1 thread is used.\n\n$ ffmpeg -threads 1 -i clip.mp4 -threads 1 -acodec libfdk_aac -vcodec libx264 -b:v 200k -vf scale=200:-2 -y clip-200.mp4\n\n$ cat /proc/$(pgrep ffmpeg)/status | grep Threads\nThreads:        1\n\n\nIf I set the -threads option on the input, it increase the number of threads used to 3. This somewhat makes sense to me since the input would use 2 threads and the output would use a single thread.\n\n$ ffmpeg -threads 2 -i clip.mp4 -threads 1 -acodec libfdk_aac -vcodec libx264 -b:v 200k -vf scale=200:-2 -y clip-200.mp4\n\n$ cat /proc/$(pgrep ffmpeg)/status | grep Threads\nThreads:        3\n\n\nThis is where I start to get confused. If instead, I leave the input -threads at 1 and set the output -threads to 2, it uses 8 threads (not 3 like I would expect).\n\n$ ffmpeg -threads 1 -i clip.mp4 -threads 2 -acodec libfdk_aac -vcodec libx264 -b:v 200k -vf scale=200:-2 -y clip-200.mp4\n\ncat /proc/$(pgrep ffmpeg)/status | grep Threads\nThreads:        8\n\n\nIf I add a second output with -threads 1, it does not increase the number of threads used.\n\n$ ffmpeg -threads 1 -i clip.mp4 -threads 2 -acodec libfdk_aac -vcodec libx264 -b:v 200k -vf scale=200:-2 -y clip-200.mp4 \\\n                                -threads 1 -acodec libfdk_aac -vcodec libx264 -b:v 250k -vf scale=250:-2 -y clip-250.mp4\n\ncat /proc/$(pgrep ffmpeg)/status | grep Threads\nThreads:        8\n\n\nHowever, if the second output also specifies two threads, the thread count jumps to 15.\n\n$ ffmpeg -threads 1 -i clip.mp4 -threads 2 -acodec libfdk_aac -vcodec libx264 -b:v 200k -vf scale=200:-2 -y clip-200.mp4 \\\n                                -threads 2 -acodec libfdk_aac -vcodec libx264 -b:v 250k -vf scale=250:-2 -y clip-250.mp4\n\ncat /proc/$(pgrep ffmpeg)/status | grep Threads\nThreads:        15\n\n\nEvery incremental bump beyond -threads 2 will use an additional 3 threads (e.g. threads 2 uses 8, threads 3 uses 11, threads 4 uses 14.\n\nSo it seems like anytime you use -threads 2 the formula is something like:\n\n1 + [ (1 + (3 * output_n_threads)) + ... ]\n\n\nUltimately my question is why do the number of actual threads used wildly differ from the options I'm specifying.\n\nThanks.\n    ",
    title: "FFmpeg is using more threads than I expect when using -threads",
    id: 123,
    PostTypeId: 1,
    bounty: 0.3729963591639047,
    UserId: 8,
    viewCount: 8,
    upvoteCount: 9,
    comments: 1
  },
  {
    body:
      '\nShort answer - these options don\'t exactly do that you think.\n\nLong answer follows:\n\nFFmpeg always has one main thread which does most of the processing. In case of multiple inputs there are also input threads for demuxing (1 thread per input); for single input demuxing is done on main thread.\n\nSetting "threads N" (where N > 1) on input enables multithreaded decoding which can spawn N additional threads for each decoder which supports it. In your case video decoder supports it and audio decoder doesn\'t so it is 3 threads - 1 main thread + 2 threads for video decoding.\n\nSimilarly, setting "threads N" on output enables multithreaded filtering and encoding which can spawn N additional threads for each filtergraph (I think in older ffmpeg versions this was "up to N threads per each filter") and each encoder which supports it. There is also one important caveat - this only applies to encoders which do their thread management via ffmpeg; libx264 doesn\'t do that - it forwards requested thread count to the x264 library which does its own thread management. x264 then might create up to 2*N threads (exact number depends on many encoding parameters). So for "threads 2" with single output you\'ll get 1 main thread + 2 threads for the scaler + at least 2 threads for libx264. This still doesn\'t add up to num_outputs * (1 + num_threads) behaviour you are seeing and I\'d be interested to learn where additional threads come from but hopefully my answer explains why "threads 2" option doesn\'t increase thread count by 2.\n    ',
    id: 124,
    PostTypeId: 2,
    PostId: 123,
    bounty: 0.3729963591639047,
    UserId: 47,
    upvoteCount: 38
  },
  {
    body:
      "\n\nI am using Visual Studio to create an asp.net web application in C# and am having issues trying to insert data from one of my pages into a table in a SQL Server database. I am getting the following error message:\n\n\n  An exception of type 'System.Data.SqlClient.SqlException' occurred in System.Data.dll but was not handled in user code\n  \n  Additional information: The variable name '@' has already been declared. Variable names must be unique within a query batch or stored procedure.\n\n\nMy code looks like this;\n\nBlock of code\n\nI have tried a few different things but I keep getting the same error and I've been on here and youtube for nearly an hour now and I can't find anything that relates to my issue. Any help would be greatly appreciated.\n\nThanks!\n\nEdit: I should add that I got this code from youtube and in the video, it worked fine. The only real difference is that my version is within an 'if' statement. I commented the if statement out and received the same error message.\n    ",
    title:
      "Trying to insert data into SQL Server database using asp.net web application, getting an error",
    id: 125,
    PostTypeId: 1,
    bounty: 0.8629458678418154,
    UserId: 64,
    viewCount: 9,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      '\nYou code is wrong. First, your sql query is incomplete; you need to include the actual variable names as part of your INSERT script:\n\nINSERT INTO parent(parentID) VALUES (@parentID)\n\n\nThen in your C# code, you need to include the exact name of the parameter when adding it to the collection:\n\nxp.Parameters.AddWithValue("@parentID", userBox.Text);\n\n\nThis is obviously for one parameter, you\'ll need to repeat the same pattern for the rest. Read more here.\n    ',
    id: 126,
    PostTypeId: 2,
    PostId: 125,
    bounty: 0.8629458678418154,
    UserId: 79,
    upvoteCount: 32
  },
  {
    body:
      "\n\nLet me define a matrix class as follows\n\ntemplate<typename T, size_t rowSize, size_t colSize>\nclass Matrix\n{\n //Class implementation\n};\n\n\nNow if i've 2 matrices defined as \n\nMatrix<double,3,2> A;\nMatrix<double,2,5> B;\nA*B;\n\n\nCan the multiplication be done, If I try it would say no arguments can take the rhs as double,2,5 for *. Is it possible to generalise the template to multiply       'double,x,y' and 'double,y,z' and return a new matrix 'double,x,y'\n    ",
    title: "Is the matrix multiplication possible with template arguments",
    id: 127,
    PostTypeId: 1,
    bounty: 0.05728847226831313,
    UserId: 67,
    viewCount: 2,
    upvoteCount: 35,
    comments: 2
  },
  {
    body:
      "\ntemplate<typename T, size_t rowSize, size_t colSize>\nclass Matrix\n{\n    // Implementation\n};\n\ntemplate<\n    typename T,\n    typename U,\n    size_t rowSize1,\n    size_t commonSize,\n    size_t colSize2\n>\nauto operator * (Matrix<T, rowSize1,commonSize> const & a,\n                 Matrix<U, commonSize,colSize2> const & b)\n  -> Matrix<decltype(std::declval<T>()*std::declval<U>()), rowSize1, colSize2>\n{\n    // Implementation\n}\n\nint main()\n{\n    Matrix<double,3,2> A;\n    Matrix<double,2,5> B;\n    auto C = A*B;\n}\n\n\nOr as member:\n\ntemplate<typename T, size_t rowSize, size_t colSize>\nclass Matrix\n{\npublic:\n    template<typename U, size_t colSize2>\n    auto operator * (Matrix<U, colSize,colSize2> const & b)\n      -> Matrix<decltype(std::declval<T>()*std::declval<U>()), rowSize, colSize2>\n    {\n        // Implementation\n    }\n\n};\n\n    ",
    id: 128,
    PostTypeId: 2,
    PostId: 127,
    bounty: 0.05728847226831313,
    UserId: 71,
    upvoteCount: 2
  },
  {
    body:
      "\nIt is possiple to overwrite the * operator within a class. \nBut then it would be generally\n\n    T& T::operator*(T otherMatrix);\n    {\n      //do multiplication by hand and return a new Matrix\n    }\n\n\nand not taking just double as only type.\n    ",
    id: 129,
    PostTypeId: 2,
    PostId: 127,
    bounty: 0.05728847226831313,
    UserId: 98,
    upvoteCount: 32
  },
  {
    body:
      '\n\nTrying to allow a user to select a photo from their photo library and then display that image in a UIImageView. Photo library is showing up just fine, but when I select a photo from my library, I get this error "[Generic] Creating an image format with an unknown type is an error". \n\nStepped through my code below but the error comes up only when selecting an image which does not occur inside either of these 2 functions. \n\n@IBAction func openPhotoLibraryButton(sender: UIButton) {\n    if UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.photoLibrary) {\n        let imagePicker = UIImagePickerController()\n        imagePicker.delegate = self\n        imagePicker.sourceType = UIImagePickerControllerSourceType.photoLibrary;\n        imagePicker.allowsEditing = false\n        self.present(imagePicker, animated: true, completion: nil)\n    }\n}\n\nfunc imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {        \n    let image = info[UIImagePickerControllerOriginalImage] as! UIImage!\n    let imageData = UIImageJPEGRepresentation(image!, 0.6)\n    let compressedJPGImage = UIImage(data: imageData!)\n    imagePicked.image = compressedJPGImage\n}\n\n\nTried the solutions suggested here: xCode 8 - Creating an image format with an unknown type is an error but none of them worked, and it sounds like several folks did not get this issue resolved. Any ideas? \n    ',
    title:
      "xcode 8.1 &amp; iOS 10.1.1 &quot;[Generic] Creating an image format with an unknown type is an error&quot; for UIImagePickerController",
    id: 130,
    PostTypeId: 1,
    bounty: 0.8955590652564063,
    UserId: 41,
    viewCount: 4,
    upvoteCount: 17,
    comments: 1
  },
  {
    body:
      '\ndid you try adding _ before picker? I believe the method was changed and the one you are using is deprecated, you should be able to let it autocomplete.\n\nfunc imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) { \n  if let image = info[UIImagePickerControllerOriginalImage] as? UIImage {\n    if let imageData = UIImageJPEGRepresentation(image, 0.6) {\n      let compressedJPGImage = UIImage(data: imageData)\n      imagePicked.image = compressedJPGImage\n    }\n  } else {\n    print("Image Picker Failure")\n    //handle any possible image picker issues/failures so that app doesn\'t crash in the future\n    //troubleshoot further if it always hits this\n  }\n  dismissViewControllerAnimated(true, completion: nil)\n}\n\n    ',
    id: 131,
    PostTypeId: 2,
    PostId: 130,
    bounty: 0.8955590652564063,
    UserId: 69,
    upvoteCount: 3
  },
  {
    body:
      '\n\nI am trying the simple droplet https://github.com/h2oai/sparkling-water program, but I am unable to make it run successfully using spark-submit. \n\nI used sparkling water 1.6.4, as used in the sample code.\n\n spark-submit --jars sparkling-water-assembly-1.6.4-all.jar swtest_2.10-1.0.jar\n\n\nI didn\'t use gradel way, provided in the sample code. I just used very simple sbt build.\n\nname := "SWTest"\n\nversion := "1.0"\n\nscalaVersion := "2.10.4"\n\nlibraryDependencies += "ai.h2o" % "sparkling-water-core_2.10" % "1.6.4"\nlibraryDependencies += "ai.h2o" % "sparkling-water-examples_2.10" % "1.6.4"\n\n\nThe program runs fine, until it reaches:\n\nval trainRDD = h2oContext.asRDD[StringHolder](irisData(\'class))\nval predictRDD = h2oContext.asRDD[StringHolder](predict)    \n\nval numMispredictions = trainRDD.zip(predictRDD).filter( i => {\n      val act = i._1\n      val pred = i._2\n      act.result != pred.result\n    }).collect()\n\nIt looks like the as.RDD needs a generic type, and here is "StringHolder"\n\n\nHowever, it reports error " Unable to find class: org.apache.spark.h2o.package$StringHolder":\n\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:  Number of Trees Model Size in Bytes Min. Depth Max. Depth Mean Depth Min. Leaves Max. Leaves Mean Leaves\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:               15                2176          1          5    4.20000           2           9     7.20000\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO: Scoring History:\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:            Timestamp   Duration Number of Trees Training MSE Training LogLoss Training Classification Error\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:  2016-12-06 15:03:50  0.261 sec               0      0.44444          1.09861                       0.64000\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:  2016-12-06 15:03:51  1.607 sec               1      0.36474          0.92664                       0.04000\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:  2016-12-06 15:03:52  1.987 sec               2      0.29854          0.79143                       0.04667\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:  2016-12-06 15:03:52  2.364 sec               3      0.24482          0.68353                       0.04667\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:  2016-12-06 15:03:53  2.668 sec               4      0.20083          0.59453                       0.04667\n12-06 15:03:53.442 127.0.0.1:54321       489    FJ-1-3    INFO:  2016-12-06 15:03:53  3.007 sec               5      0.16523          0.52069                       0.04667\ngbm prediction\n12-06 15:03:53.846 127.0.0.1:54321       489    main      INFO: Confusion Matrix (vertical: actual; across: predicted):\n12-06 15:03:53.846 127.0.0.1:54321       489    main      INFO:                 Iris-setosa Iris-versicolor Iris-virginica  Error      Rate\n12-06 15:03:53.846 127.0.0.1:54321       489    main      INFO:     Iris-setosa          50               0              0 0.0000 =  0 / 50\n12-06 15:03:53.846 127.0.0.1:54321       489    main      INFO: Iris-versicolor           0              48              2 0.0400 =  2 / 50\n12-06 15:03:53.846 127.0.0.1:54321       489    main      INFO:  Iris-virginica           0               5             45 0.1000 =  5 / 50\n12-06 15:03:53.846 127.0.0.1:54321       489    main      INFO:          Totals          50              53             47 0.0467 = 7 / 150\n12-06 15:03:53.847 127.0.0.1:54321       489    main      INFO: Top-3 Hit Ratios:\n12-06 15:03:53.847 127.0.0.1:54321       489    main      INFO: K  Hit Ratio\n12-06 15:03:53.847 127.0.0.1:54321       489    main      INFO: 1   0.953333\n12-06 15:03:53.847 127.0.0.1:54321       489    main      INFO: 2   1.000000\n12-06 15:03:53.847 127.0.0.1:54321       489    main      INFO: 3   1.000000\ncomputer number of mispredictions\ncomputer number of mispredictions\n16/12/06 15:03:55 ERROR TaskResultGetter: Exception while getting task result\ncom.esotericsoftware.kryo.KryoException: Unable to find class: org.apache.spark.h2o.package$StringHolder\n    at com.esotericsoftware.kryo.util.DefaultClassResolver.readName(DefaultClassResolver.java:138)\n    at com.esotericsoftware.kryo.util.DefaultClassResolver.readClass(DefaultClassResolver.java:115)\n    at com.esotericsoftware.kryo.Kryo.readClass(Kryo.java:610)\n    at com.esotericsoftware.kryo.Kryo.readClassAndObject(Kryo.java:721)\n    at com.twitter.chill.Tuple2Serializer.read(TupleSerializers.scala:41)\n    at com.twitter.chill.Tuple2Serializer.read(TupleSerializers.scala:33)\n    at com.esotericsoftware.kryo.Kryo.readClassAndObject(Kryo.java:729)\n    at com.esotericsoftware.kryo.serializers.DefaultArraySerializers$ObjectArraySerializer.read(DefaultArraySerializers.java:338)\n    at com.esotericsoftware.kryo.serializers.DefaultArraySerializers$ObjectArraySerializer.read(DefaultArraySerializers.java:293)\n    at com.esotericsoftware.kryo.Kryo.readClassAndObject(Kryo.java:729)\n    at org.apache.spark.serializer.KryoSerializerInstance.deserialize(KryoSerializer.scala:311)\n    at org.apache.spark.scheduler.DirectTaskResult.value(TaskResult.scala:97)\n    at org.apache.spark.scheduler.TaskResultGetter$$anon$2$$anonfun$run$1.apply$mcV$sp(TaskResultGetter.scala:60)\n    at org.apache.spark.scheduler.TaskResultGetter$$anon$2$$anonfun$run$1.apply(TaskResultGetter.scala:51)\n    at org.apache.spark.scheduler.TaskResultGetter$$anon$2$$anonfun$run$1.apply(TaskResultGetter.scala:51)\n    at org.apache.spark.util.Utils$.logUncaughtExceptions(Utils.scala:1765)\n    at org.apache.spark.scheduler.TaskResultGetter$$anon$2.run(TaskResultGetter.scala:50)\n    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)\n    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)\n    at java.lang.Thread.run(Thread.java:745)\nCaused by: java.lang.ClassNotFoundException: org.apache.spark.h2o.package$StringHolder\n    at java.lang.ClassLoader.findClass(ClassLoader.java:531)\n    at java.lang.ClassLoader.loadClass(ClassLoader.java:425)\n    at java.lang.ClassLoader.loadClass(ClassLoader.java:358)\n    at org.apache.spark.repl.h2o.InterpreterClassLoader.loadClass(InterpreterClassLoader.scala:37)\n    at java.lang.Class.forName0(Native Method)\n    at java.lang.Class.forName(Class.java:274)\n    at com.esotericsoftware.kryo.util.DefaultClassResolver.readName(DefaultClassResolver.java:136)\n    ... 19 more\nException in thread "main" org.apache.spark.SparkException: Job aborted due to stage failure: Exception while getting task result: com.esotericsoftware.kryo.KryoException: Unable to find class: org.apache.spark.h2o.package$StringHolder\n    at org.apache.spark.scheduler.DAGScheduler.org$apache$spark$scheduler$DAGScheduler$$failJobAndIndependentStages(DAGScheduler.scala:1431)\n    at org.apache.spark.scheduler.DAGScheduler$$anonfun$abortStage$1.apply(DAGScheduler.scala:1419)\n    at org.apache.spark.scheduler.DAGScheduler$$anonfun$abortStage$1.apply(DAGScheduler.scala:1418)\n    at scala.collection.mutable.ResizableArray$class.foreach(ResizableArray.scala:59)\n    at scala.collection.mutable.ArrayBuffer.foreach(ArrayBuffer.scala:47)\n    at org.apache.spark.scheduler.DAGScheduler.abortStage(DAGScheduler.scala:1418)\n    at org.apache.spark.scheduler.DAGScheduler$$anonfun$handleTaskSetFailed$1.apply(DAGScheduler.scala:799)\n    at org.apache.spark.scheduler.DAGScheduler$$anonfun$handleTaskSetFailed$1.apply(DAGScheduler.scala:799)\n    at scala.Option.foreach(Option.scala:236)\n    at org.apache.spark.scheduler.DAGScheduler.handleTaskSetFailed(DAGScheduler.scala:799)\n    at org.apache.spark.scheduler.DAGSchedulerEventProcessLoop.doOnReceive(DAGScheduler.scala:1640)\n    at org.apache.spark.scheduler.DAGSchedulerEventProcessLoop.onReceive(DAGScheduler.scala:1599)\n    at org.apache.spark.scheduler.DAGSchedulerEventProcessLoop.onReceive(DAGScheduler.scala:1588)\n    at org.apache.spark.util.EventLoop$$anon$1.run(EventLoop.scala:48)\n    at org.apache.spark.scheduler.DAGScheduler.runJob(DAGScheduler.scala:620)\n    at org.apache.spark.SparkContext.runJob(SparkContext.scala:1832)\n    at org.apache.spark.SparkContext.runJob(SparkContext.scala:1845)\n    at org.apache.spark.SparkContext.runJob(SparkContext.scala:1858)\n    at org.apache.spark.SparkContext.runJob(SparkContext.scala:1929)\n    at org.apache.spark.rdd.RDD$$anonfun$collect$1.apply(RDD.scala:927)\n    at org.apache.spark.rdd.RDDOperationScope$.withScope(RDDOperationScope.scala:150)\n    at org.apache.spark.rdd.RDDOperationScope$.withScope(RDDOperationScope.scala:111)\n    at org.apache.spark.rdd.RDD.withScope(RDD.scala:316)\n    at org.apache.spark.rdd.RDD.collect(RDD.scala:926)\n    at swtest$.main(swtest.scala:68)\n    at swtest.main(swtest.scala)\n    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)\n    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n    at java.lang.reflect.Method.invoke(Method.java:606)\n    at org.apache.spark.deploy.SparkSubmit$.org$apache$spark$deploy$SparkSubmit$$runMain(SparkSubmit.scala:735)\n    at org.apache.spark.deploy.SparkSubmit$.doRunMain$1(SparkSubmit.scala:181)\n    at org.apache.spark.deploy.SparkSubmit$.submit(SparkSubmit.scala:206)\n    at org.apache.spark.deploy.SparkSubmit$.main(SparkSubmit.scala:121)\n    at org.apache.spark.deploy.SparkSubmit.main(SparkSubmit.scala)\n\n\nI think I included sparkling-water-assembly-1.6.4-all.jar, which should contains everything.\n\nAnyone would suggests any ideas?\n    ',
    title: "Unable to find class: org.apache.spark.h2o.package$StringHolder",
    id: 132,
    PostTypeId: 1,
    bounty: 0.9480379877294771,
    UserId: 45,
    viewCount: 4,
    upvoteCount: 31,
    comments: 1
  },
  {
    body:
      '\nthanks for the report.\n\nYou have actually found a bug in sparkling-water. The fix is already here https://github.com/h2oai/sparkling-water/pull/151 and will go into the next release.\n\nIn the meanwhile, the simple workaround is to set conf.set("spark.ext.h2o.repl.enabled","false") on the sparkConf before you create sparkContext as Mateusz pointed out ( if you don\'t run Scala code from Flow UI )\n    ',
    id: 133,
    PostTypeId: 2,
    PostId: 132,
    bounty: 0.9480379877294771,
    UserId: 53,
    upvoteCount: 16
  },
  {
    body:
      '\n\nI have a complex SVG with multiple paths. I\'m trying to the change the path data (d) of the paths to match the position of the cursor so when the user mouseover the svg, they move toward the pointer.\n\nWhat seem like a simple animation feels more like nightmare considering I\'m not sure about my approach and choice of tools.\n\nHere is my SVG:\n\n<svg version="1.1" id="graph" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n                 viewBox="0 0 222 246.6" style="enable-background:new 0 0 222 246.6;" xml:space="preserve">\n            <style type="text/css">\n                .st0{clip-path:url(#SVGID_2_);fill:#52B3F5;}\n                .st1{clip-path:url(#SVGID_2_);fill:#8FDAFF;}\n                .st2{clip-path:url(#SVGID_2_);fill:#0468FF;}\n                .st3{clip-path:url(#SVGID_2_);fill:none;stroke:#0468FF;stroke-miterlimit:10;}\n                .st4{clip-path:url(#SVGID_2_);fill:none;stroke:#8FDAFF;stroke-miterlimit:10;}\n                .st5{clip-path:url(#SVGID_2_);fill:none;stroke:#52B3F5;stroke-miterlimit:10;}\n            </style>\n            <g>\n                <defs>\n                    <rect id="SVGID_1_" width="222" height="246.6"/>\n                </defs>\n                <clipPath id="SVGID_2_">\n                    <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>\n                </clipPath>\n                <path class="st0" d="M222,233.8c0,3.2-2.6,5.8-5.8,5.8c-3.2,0-5.8-2.6-5.8-5.8c0-3.2,2.6-5.8,5.8-5.8\n                    C219.4,228,222,230.6,222,233.8"/>\n                <path class="st0" d="M105.2,150c0,2.1-1.7,3.7-3.7,3.7c-2.1,0-3.7-1.7-3.7-3.7c0-2.1,1.7-3.7,3.7-3.7\n                    C103.5,146.2,105.2,147.9,105.2,150"/>\n                <path class="st0" d="M34.4,21.1c0,2.5-2,4.5-4.5,4.5s-4.4-2-4.4-4.5c0-2.5,2-4.4,4.4-4.4S34.4,18.6,34.4,21.1"/>\n                <path class="st1" d="M110.5,207.1c0,3.3-2.7,5.9-5.9,5.9c-3.3,0-5.9-2.7-5.9-5.9c0-3.3,2.7-5.9,5.9-5.9\n                    C107.8,201.2,110.5,203.9,110.5,207.1"/>\n                <path class="st2" d="M128.4,207.1c0,3.9-3.2,7.1-7.1,7.1c-3.9,0-7.1-3.2-7.1-7.1c0-3.9,3.2-7.1,7.1-7.1\n                    C125.3,200.1,128.4,203.2,128.4,207.1"/>\n                <path class="st2" d="M22.7,240.8c0,3.2-2.6,5.8-5.8,5.8c-3.2,0-5.8-2.6-5.8-5.8c0-3.2,2.6-5.8,5.8-5.8\n                    C20.1,235,22.7,237.6,22.7,240.8"/>\n                <path class="st0" d="M9.2,232.7c0,2.6-2.1,4.6-4.6,4.6S0,235.3,0,232.7s2.1-4.6,4.6-4.6S9.2,230.1,9.2,232.7"/>\n                <polygon class="st3" points="148.1,105.2 106.2,207.1 120.5,207.1 155.4,122.2    "/>\n                <path class="st2" d="M202.5,23.5c0,3.1-2.5,5.7-5.7,5.7s-5.7-2.5-5.7-5.7c0-3.1,2.5-5.7,5.7-5.7S202.5,20.4,202.5,23.5"/>\n                <path class="st2" d="M188.7,17.5c0,1.9-1.5,3.4-3.4,3.4c-1.9,0-3.4-1.5-3.4-3.4c0-1.9,1.5-3.4,3.4-3.4\n                    C187.2,14.1,188.7,15.6,188.7,17.5"/>\n                <polygon class="st3" points="184.4,17.1 106.2,207.1 120.5,207.1 196,23.4 194.2,22.4     "/>\n                <polygon class="st4" points="39.4,17 29.5,22.4 27.7,23.3 103.3,207.1 106.3,207.1 117.6,207.1    "/>\n                <polygon class="st3" points="118.7,5.6 105.9,5.6 103.2,5.6 5.8,234.2 6.4,234.6 16,241.4     "/>\n                <polygon class="st5" points="17.3,242.7 121.4,149.5 111.7,140.8 6.3,234.6 9.2,236.7     "/>\n                <polygon class="st5" points="217.3,234.1 111.7,140.8 101.9,149.5 205.8,242.5 206.4,242.1    "/>\n                <polygon class="st4" points="217.3,234.1 120.3,5.6 105.8,5.6 206.4,242.1    "/>\n                <polygon class="st5" points="181.8,15.6 102,87.3 111.7,96.1 194.2,22.4  "/>\n                <polygon class="st5" points="41.7,15.7 29.5,22.4 111.7,96.1 121.6,87.3  "/>\n                <path class="st0" d="M46.9,17.7c0,3-2.4,5.3-5.3,5.3c-3,0-5.3-2.4-5.3-5.3c0-3,2.4-5.3,5.3-5.3C44.5,12.3,46.9,14.7,46.9,17.7"/>\n                <path class="st1" d="M44.2,20.7c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1S44.2,19,44.2,20.7"/>\n                <path class="st1" d="M31.4,22.3c0,1.5-1.2,2.7-2.7,2.7S26,23.8,26,22.3c0-1.5,1.2-2.7,2.7-2.7S31.4,20.8,31.4,22.3"/>\n                <path class="st2" d="M105,5.6c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8C103.3,1.9,105,3.5,105,5.6"/>\n                <path class="st2" d="M124.3,5.6c0,3.1-2.5,5.6-5.6,5.6c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.5-5.6,5.6-5.6C121.8,0,124.3,2.5,124.3,5.6"\n                    />\n                <path class="st1" d="M123.6,5.6c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1\n                    C122.2,2.5,123.6,3.9,123.6,5.6"/>\n                <path class="st0" d="M186.2,15.7c0,2.5-2.1,4.6-4.6,4.6s-4.6-2.1-4.6-4.6c0-2.5,2.1-4.6,4.6-4.6S186.2,13.2,186.2,15.7"/>\n                <path class="st0" d="M197.8,22.4c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8\n                    C196.1,18.7,197.8,20.3,197.8,22.4"/>\n                <path class="st0" d="M199.4,22.4c0,2.9-2.4,5.3-5.3,5.3c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3\n                    C197,17.1,199.4,19.5,199.4,22.4"/>\n                <path class="st1" d="M111.4,5.6c0,3.1-2.5,5.6-5.6,5.6c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.5-5.6,5.6-5.6C108.9,0,111.4,2.5,111.4,5.6"\n                    />\n                <path class="st0" d="M142.4,52.6c0,1.1-0.9,2.1-2.1,2.1c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1\n                    C141.5,50.5,142.4,51.5,142.4,52.6"/>\n                <path class="st1" d="M132.9,61.7c0,1.6-1.3,3-3,3c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3C131.5,58.8,132.9,60.1,132.9,61.7"/>\n                <path class="st0" d="M149.1,65.5c0,2-1.7,3.7-3.7,3.7s-3.7-1.7-3.7-3.7c0-2,1.7-3.7,3.7-3.7S149.1,63.4,149.1,65.5"/>\n                <path class="st1" d="M140.2,75.1c0,2.9-2.3,5.2-5.2,5.2c-2.9,0-5.2-2.3-5.2-5.2c0-2.9,2.3-5.2,5.2-5.2\n                    C137.9,69.9,140.2,72.2,140.2,75.1"/>\n                <path class="st1" d="M221,233.8c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8C219.4,230.1,221,231.7,221,233.8"/>\n                <path class="st1" d="M209.5,240.7c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8\n                    C207.8,237,209.5,238.7,209.5,240.7"/>\n                <path class="st2" d="M85,52.6c0,1.1-0.9,1.9-1.9,1.9c-1.1,0-1.9-0.9-1.9-1.9c0-1.1,0.9-1.9,1.9-1.9C84.2,50.7,85,51.5,85,52.6"/>\n                <path class="st2" d="M96.1,62c0,1.5-1.2,2.7-2.7,2.7c-1.5,0-2.7-1.2-2.7-2.7c0-1.5,1.2-2.7,2.7-2.7C94.9,59.3,96.1,60.5,96.1,62"/>\n                <path class="st2" d="M9.2,233.7c0,1.6-1.3,2.9-2.9,2.9s-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9S9.2,232.1,9.2,233.7"/>\n                <path class="st0" d="M82.7,65.7c0,2.6-2.1,4.7-4.7,4.7c-2.6,0-4.7-2.1-4.7-4.7c0-2.6,2.1-4.7,4.7-4.7C80.5,61,82.7,63.1,82.7,65.7"\n                    />\n                <path class="st0" d="M90.1,75.1c0,1-0.8,1.9-1.9,1.9c-1,0-1.9-0.8-1.9-1.9c0-1,0.8-1.9,1.9-1.9C89.3,73.2,90.1,74.1,90.1,75.1"/>\n                <path class="st2" d="M150.4,105.2c0,1.5-1.2,2.7-2.7,2.7c-1.5,0-2.7-1.2-2.7-2.7c0-1.5,1.2-2.7,2.7-2.7\n                    C149.2,102.6,150.4,103.8,150.4,105.2"/>\n                <path class="st2" d="M159.7,123c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C157.9,119,159.7,120.7,159.7,123"/>\n                <path class="st1" d="M159.2,88c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C157.4,83.9,159.2,85.7,159.2,88"/>\n                <path class="st1" d="M165.2,105.7c0,1.5-1.2,2.7-2.7,2.7c-1.5,0-2.7-1.2-2.7-2.7c0-1.5,1.2-2.7,2.7-2.7\n                    C164,103.1,165.2,104.2,165.2,105.7"/>\n                <path class="st2" d="M79.9,104.1c0,2.4-1.9,4.3-4.3,4.3c-2.4,0-4.3-1.9-4.3-4.3c0-2.4,1.9-4.3,4.3-4.3\n                    C78,99.7,79.9,101.7,79.9,104.1"/>\n                <path class="st2" d="M109.8,207.1c0,2-1.6,3.6-3.6,3.6c-2,0-3.6-1.6-3.6-3.6c0-2,1.6-3.6,3.6-3.6\n                    C108.2,203.5,109.8,205.2,109.8,207.1"/>\n                <path class="st2" d="M71,86.7c0,1.6-1.3,2.9-2.9,2.9s-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9S71,85.1,71,86.7"/>\n                <path class="st0" d="M22.7,240.8c0,2-1.7,3.7-3.7,3.7s-3.7-1.7-3.7-3.7c0-2.1,1.7-3.7,3.7-3.7S22.7,238.7,22.7,240.8"/>\n                <path class="st1" d="M123.7,207.1c0,2.8-2.2,5-5,5c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5C121.4,202.1,123.7,204.4,123.7,207.1"/>\n                <path class="st0" d="M114.3,140.8c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1S114.3,139.1,114.3,140.8"/>\n                <path class="st0" d="M104.6,168c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1\n                    C103.2,164.9,104.6,166.3,104.6,168"/>\n                <path class="st1" d="M94.7,176.6c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4s1.8-4,4-4C92.9,172.7,94.7,174.4,94.7,176.6"/>\n                <path class="st2" d="M121,168c0,0.9,0.7,1.6,1.6,1.6c0.9,0,1.6-0.7,1.6-1.6c0-0.9-0.7-1.6-1.6-1.6C121.7,166.4,121,167.1,121,168"\n                    />\n                <path class="st0" d="M136,164.1c0,1.3,1,2.3,2.3,2.3c1.3,0,2.3-1,2.3-2.3c0-1.3-1-2.3-2.3-2.3C137,161.8,136,162.8,136,164.1"/>\n                <path class="st2" d="M127.5,176.6c0,3.3,2.6,5.9,5.9,5.9c3.3,0,5.9-2.6,5.9-5.9c0-3.3-2.6-5.9-5.9-5.9\n                    C130.1,170.7,127.5,173.4,127.5,176.6"/>\n                <path class="st0" d="M125.6,150.1c0,2.7-2.2,5-5,5c-2.7,0-5-2.2-5-5c0-2.7,2.2-5,5-5C123.4,145.2,125.6,147.4,125.6,150.1"/>\n                <path class="st1" d="M103.9,154.9c0,3.8-3.1,6.9-6.9,6.9c-3.8,0-6.9-3.1-6.9-6.9c0-3.8,3.1-6.9,6.9-6.9\n                    C100.8,148,103.9,151.1,103.9,154.9"/>\n                <path class="st0" d="M207.3,239.1c0,1.8-1.5,3.3-3.3,3.3s-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3S207.3,237.3,207.3,239.1"/>\n            </g>\n            </svg>\n\n\nAnd my full, completely failed attempt can be found here\n\nI guess the real question would be how to find the "d" endpoint of the mouse cursor so I can assign it to the paths.\n    ',
    title: "snapsvg - Move path to cursor pointer",
    id: 134,
    PostTypeId: 1,
    bounty: 0.8328579702747156,
    UserId: 73,
    viewCount: 6,
    upvoteCount: 24,
    comments: 1
  },
  {
    body:
      '\ncx and cy are for circles and ellipses.  And you don\'t need to modify the d attribute for paths either.\n\nAll you need to do to move any element is apply a translate transform. Ie:\n\n<path ... transform="translate(20, 20)">\n\n\nIn Snap you can use the Element.transform() function to apply a transform.\n\nHere\'s a demo where I move each path towards the pointer a little bit every time you move the pointer.\n\nfunction moveFunc( ev, x, y ) {\n    //console.log(ev);\n    paths.forEach(function(el) {\n       // Convert screen mouse coords to the equivalent point in SVG coords\n       var pt = cursorPoint(x, y);\n       // Get the "center" of each path by way of its bounding box\n       var b = el.getBBox();\n       var cx = b.x + b.width/2;\n       var cy = b.y + b.height/2;\n       // Get the direction vector from the path center to the pointer location\n       var dx = pt.x - cx;\n       var dy = pt.y - cy;\n       // Get the current transform (if any) on the path\n       var currentTransform = el.transform().localMatrix;\n       // Add the tranlation that moves the paths a little toward the pointer\n       currentTransform = currentTransform.translate(dx/20, dy/20);\n       el.transform(currentTransform);\n    });\n}\n\n\n// Convert a screen space coordinate to an SVG coordinate\nfunction cursorPoint(x, y) {\n  var svg = s.node;\n  var pt = svg.createSVGPoint();\n  pt.x = x;  pt.y = y;\n  return pt.matrixTransform(svg.getScreenCTM().inverse());\n}\n\n\nHopefully this is enough to get you started.  To move the <polygon> points, you\'ll need to get the array of points and then update each point in the array by adding dx,dy.\n\nYou can get the points of a polygon using el.node.points.\n\nGood luck!\n    ',
    id: 135,
    PostTypeId: 2,
    PostId: 134,
    bounty: 0.8328579702747156,
    UserId: 97,
    upvoteCount: 34
  },
  {
    body:
      '\n\nI have a User model with a matches field that is of :map type. I\'m trying to update it in the console, but it\'s not working:\n\niex(16)> changeset = User.changeset(u, %{ matches: %{ "123": true } })\n#Ecto.Changeset<action: nil, changes: %{}, errors: [], data: #VideoChat.User<>,\n valid?: true>\niex(18)> VideoChat.Repo.update(changeset)\n{:ok,\n %VideoChat.User{__meta__: #Ecto.Schema.Metadata<:loaded, "users">,\n  device_identifier: "123", id: 1,\n  inserted_at: #Ecto.DateTime<2016-12-06 23:02:56>, matches: %{},\n  updated_at: #Ecto.DateTime<2016-12-06 23:02:56>}}\niex(19)> u = User |> VideoChat.Repo.one\n[debug] QUERY OK source="users" db=1.2ms\nSELECT u0."id", u0."device_identifier", u0."matches", u0."inserted_at", u0."updated_at" FROM "users" AS u0 []\n%VideoChat.User{__meta__: #Ecto.Schema.Metadata<:loaded, "users">,\n device_identifier: "123", id: 1,\n inserted_at: #Ecto.DateTime<2016-12-06 23:02:56>, matches: %{},\n updated_at: #Ecto.DateTime<2016-12-06 23:02:56>}\n\n\nThis is my user model:\n\ndefmodule VideoChat.User do\n  use VideoChat.Web, :model\n\n  schema "users" do\n    field :device_identifier, :string\n    field :matches, :map\n\n    timestamps()\n  end\n\n  @doc """\n  Builds a changeset based on the `struct` and `params`.\n  """\n  def changeset(struct, params \\\\ %{}) do\n    struct\n    |> cast(params, [:device_identifier])\n    |> validate_required([:device_identifier])\n  end\nend\n\n\nHow do I update a :map field?\n    ',
    title: "Ecto + Elixir: How do I update a hash map field?",
    id: 136,
    PostTypeId: 1,
    bounty: 0.706992841013518,
    UserId: 73,
    viewCount: 10,
    upvoteCount: 11,
    comments: 0
  },
  {
    body:
      '\n\nMy issue is this: I have created an app that is supposed to accept Credit/Debit cards. And Im using Braintree 4 SDK in iOS with swift using a cocoa pod. I can present the drop in just fine but what it does is that just ask for a cc number and then disappears, why? Because I use the code in the quick-start guide and it\'s supposed to do that. But it doesn\'t say anything about when to call the nonce function or show the amount or anything! With SDK 3 is a view controller where I can put the delegate and almost everything works except remembering cards. So my question are where am I supposed to call the nonce function in iOS? Where does the total should be shown? And how do I make a payment to the server BT?.\n\nThe page is really lacking actual information for everything! Help.\n\nMy code: \n\n// Mark - Braintree methods\n\n    func showDropIn(clientTokenOrTokenizationKey: String) {\n\n            let request =  BTDropInRequest()\n            request.amount = "\\(total)"\n            request.currencyCode = "MXN"\n//            request.\n            let dropIn = BTDropInController(authorization: clientTokenOrTokenizationKey, request: request)\n            { (controller, result, error) in\n                if (error != nil) {\n                    print("ERROR")\n                } else if (result?.isCancelled == true) {\n                    print("CANCELLED")\n                } else if let result = result {\n                    // Use the BTDropInResult properties to update your UI\n                    // result.paymentOptionType\n                    // result.paymentMethod\n                    // result.paymentIcon\n                    // result.paymentDescription\n                    print(result)\n\n//                    controller.\n                }\n                controller.dismiss(animated: true, completion: nil)\n            }\n            self.present(dropIn!, animated: true, completion: nil)\n\n//        //create paymentrequest\n//        let\n//        paymentRequest: BTPaymentRequest = BTPaymentRequest()\n//        paymentRequest.summaryTitle = "Lavado Automozo"\n//        paymentRequest.summaryDescription = "$\\(totalLabel.text!) precio total de los servicios solicitados."\n//        paymentRequest.displayAmount = "$\\(total!).00 MXN"\n//        paymentRequest.currencyCode = "MXN"\n//        paymentRequest.callToActionText = "Aceptar compra."\n//        paymentRequest.shouldHideCallToAction = false\n//        //set delegate\n//        let dropInViewController = BTDropInViewController(apiClient: braintreeClient!)\n//        dropInViewController.delegate = self\n//        dropInViewController.paymentRequest = paymentRequest\n//        //add cancel button\n//        dropInViewController.navigationItem.leftBarButtonItem = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.cancel, target: self, action: #selector(ViewController.userDidCancelPayment))\n//        \n//        //present view\n//        let navigationController = UINavigationController(rootViewController: dropInViewController)\n//        \n//        present(navigationController, animated: true, completion: nil)\n//        \n        //        let request =  BTDropInRequest()\n//        let dropIn = BTDropInController()\n//        { (controller, result, error) in\n//            if (error != nil) {\n//                print("ERROR")\n//            } else if (result?.isCancelled == true) {\n//                print("CANCELLED")\n//            } else if let result = result {\n//                // Use the BTDropInResult properties to update your UI\n//                // result.paymentOptionType\n//                // result.paymentMethod\n//                // result.paymentIcon\n//                // result.paymentDescription\n//            }\n//            controller.dismiss(animated: true, completion: nil)\n//        }\n//        self.present(dropIn!, animated: true, completion: nil)\n    }\n\n\nAnd Where am I supposed to call this?:\n\nfunc postNonceToServer(paymentMethodNonce: String) -> Bool {\n\n        PFCloud.callFunction(inBackground: "checkout", withParameters: ["payment_method_nonce" : paymentMethodNonce, "amount" : "\\(total!).00"]) {\n\n            (response, error) -> Void in\n\n            //            let ratings = response as? Float\n            // ratings is 4.5\n\n            if error != nil {\n\n\n            } else {\n\n\n            }\n\n            print("the response \\(response ?? "nil")")\n            print("The error: \\(error?.localizedDescription)")\n\n            //self.clientToken = response as! String\n\n//            print(self.clientToken)\n\n        }\n\n        let dateFormatter = DateFormatter()\n        dateFormatter.dateFormat = "mmm. dd, YYYY HH:mm"\n        dateFormatter.timeZone = NSTimeZone.local\n\n        let fechaRegistro = dateFormatter.string(from: Date())\n\n//        displayError("Exito", message: "Tu pago ha sido procesado, en unos momentos atenderemos tu orden. Total es de $\\(totalLabel.text!) la fecha registrada \\(fechaRegistro)")\n\n        let usuarioPagado: PFObject = PFObject(className: "Ordenes")\n        let location: PFGeoPoint = PFGeoPoint(latitude: ubicacion.latitude, longitude: ubicacion.longitude)\n        usuarioPagado["Ubicacion"] = location\n        usuarioPagado["NumeroExterior"] = numeroExteriorTextField.text!\n        usuarioPagado["NumeroDeTelefono"] = telefonoTextField.text!\n        usuarioPagado["LavadoCarro"] = numeroCarrosTextField.text!\n        usuarioPagado["LavadoMiniVan"] = numeroMinivanTextField.text!\n        usuarioPagado["LavadoPickUp"] = numeroPickUpsTextField.text!\n        usuarioPagado["LavadoDeVan"] = numeroVansTextField.text!\n        usuarioPagado["LavadoAspiradoCarro"] = numeroAspiradoCarrosTextField.text!\n        usuarioPagado["LavadoAspiradoMiniVan"] = numeroAspiradoMinivanTextField.text!\n        usuarioPagado["LavadoAspiradoPickUp"] = numeroPickUpsTextField.text!\n        usuarioPagado["LavadoAspiradoDeVan"] = numeroAspiradoVansTextField.text!\n        usuarioPagado["Monto"] = totalLabel.text!\n        usuarioPagado["NumeroDeTelefono"] = telefonoTextField.text!\n        usuarioPagado["TipoDeCelular"] = "iPhone"\n        usuarioPagado["FechaDeOrden"] = fechaRegistro\n        //usuarioPagado["TipoDeCelular"]\n        //usuarioPagado["PaymentConfirmation"] = completedPayment.confirmation.description\n        //\n        //        usuarioPagado.saveInBackground() {\n        //            (success: Bool, error: Error?) -> Void in\n        //\n        //            if error == nil {\n        //\n        //                //done\n        //                print("saved object")\n        //\n        //            } else {\n        //\n        //                //not done\n        //                print("not saved because \\(error?.localizedDescription)")\n        //\n        //            }\n        //        }\n\n        do {\n\n            let result = try usuarioPagado.save()\n\n//            displayError("Exito", message: "Tu pago ha sido procesado, en unos momentos atenderemos tu orden. Total es de $\\(totalLabel.text!) la fecha registrada \\(fechaRegistro)")\n//            \n\n        } catch let error {\n\n            print(error.localizedDescription)\n            self.displayError("Error", message: "Hubo un error al guardar tu informacion, ponte ne contacto con nosotros.")\n            return false\n        }\n        numeroCarrosTextField.text = "0"\n        numeroMinivanTextField.text = "0"\n        numeroPickUpsTextField.text = "0"\n        numeroVansTextField.text = "0"\n\n        numeroAspiradoCarrosTextField.text = "0"\n        numeroAspiradoMinivanTextField.text = "0"\n        numeroAspiradoPickUpsTextField.text = "0"\n        numeroAspiradoVansTextField.text = "0"\n        totalLabel.text = "00.00"\n        self.lavadoSwitch.isOn = false\n        self.lavadoYAspiradSwitch.isOn = false\n\n        self.numeroExteriorTextField.text = ""\n        self.telefonoTextField.text = ""\n//        displayError("Exito", message: "Tu pago ha sido procesado, en unos momentos atenderemos tu orden. Total es de $\\(totalLabel.text!) la fecha registrada \\(fechaRegistro)")\n\n        // Update URL with your server\n//        let paymentURL = URL(string: "https://your-server.example.com/payment-methods")!\n//        let request = NSMutableURLRequest(url: paymentURL)\n//        request.httpBody = "payment_method_nonce=\\(paymentMethodNonce)".data(using: String.Encoding.utf8)\n//        request.httpMethod = "POST"\n//        \n//        URLSession.shared.dataTask(with: request as URLRequest) { (data, response, error) -> Void in\n//            // TODO: Handle success or failure\n//            }.resume()\n        return true\n\n    }\n\n\nEDIT\n\n\n\n\nAfter the dummy card it just closes.\n    ',
    title: "How to implement a payment app with Braintree in iOS",
    id: 137,
    PostTypeId: 1,
    bounty: 0.9351866096933157,
    UserId: 11,
    viewCount: 3,
    upvoteCount: 19,
    comments: 1
  },
  {
    body:
      '\nFull disclosure: I work at Braintree. If you have any further questions, feel free to contact support.\n\nYou can access the payment method nonce via the result object within showDropIn(). This is also where you may call postNonceToServer().\n\nfunc showDropIn(clientTokenOrTokenizationKey: String) {\n    let request =  BTDropInRequest()\n    request.amount = "\\(total)"\n    request.currencyCode = "MXN"\n    let dropIn = BTDropInController(authorization: clientTokenOrTokenizationKey, request: request)\n    { (controller, result, error) in\n        if (error != nil) {\n            print("ERROR")\n        } else if (result?.isCancelled == true) {\n            print("CANCELLED")\n        } else if let result = result {\n            let selectedPaymentMethod = result.paymentMethod! // retrieve the payment method.\n            self.postNonceToServer(paymentMethodNonce: selectedPaymentMethod.nonce) // call postNonceToServer() with the nonce from the selected payment method.\n        }\n        controller.dismiss(animated: true, completion: nil)\n    }\n    self.present(dropIn!, animated: true, completion: nil)\n}\n\n\nAfter you successfully call postNonceToServer() you can receive the payment method nonce and create a transaction on your server.\n    ',
    id: 138,
    PostTypeId: 2,
    PostId: 137,
    bounty: 0.9351866096933157,
    UserId: 47,
    upvoteCount: 5
  },
  {
    body:
      "\n\nRight now I have two last problem with the first part of my library. And the first one is this thing not possible in C++ without hack (if I want the constexpr version), it's a derived class counter:\n\nclass FooBase {\n\n  protected:\n    static int  Counter;\n};\n\nclass Foo : public FooBase {\n\n  public:\n    static const int  Type;\n};\n\nconst int  Foo::Type = ++FooBase::Counter;\n\nstruct FooTest : public Foo {};\n\n\nMust be in a source file:\n\nint  FooBase::Counter = 0;\n\n\nWhy I need this counter? Well I use it as a type and an index into another array.\n\nI have two problem with that:\n\n\nThe Type is not constexpr, but this thing seems not really possible\nI have the only line of code that need to be put into a source file of my whole library\n\n\nI can know how many derived class there is (with a macro that's not horrible) if it's can help, but I don't have any idea about something better.\n\nEven if it's means add class or whatever, I'd like to see your suggestions/alternatives. If you can at least remove the int FooBase::Counter = 0; line, it will be nice.\n\nPS: I don't have any C++ limitations, TS are welcome.\n\nPSS: The real case is a little more complex and use CRTP, I hope it won't be a problem.\n    ",
    title: "Automatic counter for derived class / Alternative?",
    id: 139,
    PostTypeId: 1,
    bounty: 0.7152628830263277,
    UserId: 74,
    viewCount: 9,
    upvoteCount: 14,
    comments: 1
  },
  {
    body:
      "\nIt is not possible in principle to have a derived class counter to be a compile time constant. The reason is that the compiler cannot know, when compiling one translation unit, how many derived classes are in other translation units, or in which order you will link them.\n\nEven worse, you might decide to put some object files containing derived classes into a dynamic library that you load at runtime. In that case, the total number of derived classes may change during the run time of the program. And again, there is no way for the compiler to determine if that is the case.\n\nSo in short, what you are seeing is not a specific shortcoming of the C++ language, but a fundamental restriction of the separate compilation model. Which means, if you want to do it, you need to write an external tool operating on the complete source code for generating the initializer expressions of the constexpr variables.\n    ",
    id: 140,
    PostTypeId: 2,
    PostId: 139,
    bounty: 0.7152628830263277,
    UserId: 49,
    upvoteCount: 33
  },
  {
    body:
      '\n\nI have a problem!\nI created a program and I put it a song, but I wanted the program to search the music inside the musics folder to play it.\n\nplayer.SoundLocation = "musics\\advm.wav";\n\n\nIt does not work.\nIt\'s as if he searches for the file "musics \\ advm.wav" directly.\nHelp Me!\n\nSorry for bad english.\n    ',
    title: "C# - Windows Forms - Visual Studio - Search music location",
    id: 141,
    PostTypeId: 1,
    bounty: 0.5532535787760664,
    UserId: 29,
    viewCount: 9,
    upvoteCount: 33,
    comments: 1
  },
  {
    body:
      '\nJust as Lei stated, you may just have to give it the full path. The current state you have the SoundLocation assumes this "musics\\" folder is within the working or running directory. \n\nSo if the .wav file\'s folder is not in the same location as your application\'s exe, then just specify the full path.\n\nExample:\n\nplayer.SoundLocation = @"C:\\Users\\Chris\\Music\\advm.wav";\n\n    ',
    id: 142,
    PostTypeId: 2,
    PostId: 141,
    bounty: 0.5532535787760664,
    UserId: 100,
    upvoteCount: 16
  },
  {
    body:
      "\n\nI can bring up a web page, no problem.  I can save the webpage...as html, no problem.  I need to save the webpage as mht so I can can get all the html that gets hidden without saving as mht.  In researching I'm coming up with absolutely nothing as to how to save as mht using python.  Like I said above I can try to save it as a mht file, using the standard coded for saving as html but that simply doesn't work...not surprised it doesn't work either, but it was worth a shot.\n\nurl = 'https://www.thewebsite.com'\nhtml = urllib.request.urlopen(url).read()\n\nm = open('websitetest.mht', 'w')\nm.write(str(html))\nm.close()\n\n\nThe site I'm trying to save does 'hidden code' that comes across when saved as mht, but not when saved as html.  Hence why I'm trying to save as mht so I get all the code and then can go through the code to pull off what I need to compile a database.\n    ",
    title: "Python, save as mht",
    id: 143,
    PostTypeId: 1,
    bounty: 0.0846058537622214,
    UserId: 40,
    viewCount: 8,
    upvoteCount: 20,
    comments: 1
  },
  {
    body:
      "\nThere is a very handy Github project coded in Python 2.7 (you need to make simple modifications to make it compatible with Python 3.4). This project has code for packing/unpacking MHT files. I think this is what you are looking for:\n\nUn/packs an MHT (MHTML) archive into/from separate files, writing/reading them in directories to match their Content-Location.\n    ",
    id: 144,
    PostTypeId: 2,
    PostId: 143,
    bounty: 0.0846058537622214,
    UserId: 89,
    upvoteCount: 1
  },
  {
    body:
      "\n\nI am trying to find the assigned tax rate for each individual based on the country and annual income from picture below by referring to 2.\n\nThank you!\n\n\n\n=IF(OR(G6=0,G6=-1),0,INDEX(INDEX(TaxRates!D:D,MATCH(A7,TaxRates!A:A,0)):INDEX(TaxRates!D:D,MATCH(A7,TaxRates!A:A,0)+COUNTIF(TaxRates!A:A,A7)-1),MATCH(J7,INDEX(TaxRates!B:B,MATCH(A7,TaxRates!A:A,0)):INDEX(TaxRates!B:B,MATCH(A7,TaxRates!A:A,0)+COUNTIF(TaxRates!A:A,A7)-1),1)))\n    ",
    title: "Excel. Use information from two different sources",
    id: 145,
    PostTypeId: 1,
    bounty: 0.02388204548975459,
    UserId: 1,
    viewCount: 3,
    upvoteCount: 27,
    comments: 1
  },
  {
    body:
      "\nAssuming that \n\n\nboth worksheets start in column A\nrow 1 has column headings\nformula starts in row 2 on People sheet\ndata in the TaxRates sheet is sorted ascending by country and then ascending by lower income\nyou may want to add a row for 0 to first lower bound for each country.\n\n\nRead the formula from inside out. It first establishes a lookup range that goes from the first occurrence of the given country to the last row with the given country, then does an approximate match on the lower bound income for these rows.\n\n=INDEX(INDEX(TaxRates!D:D,MATCH(A2,TaxRates!A:A,0)):INDEX(TaxRates!D:D,MATCH(A2,TaxRates!A:A,0)+COUNTIF(TaxRates!A:A,A2)-1),MATCH(I2,INDEX(TaxRates!B:B,MATCH(A2,TaxRates!A:A,0)):INDEX(TaxRates!B:B,MATCH(A2,TaxRates!A:A,0)+COUNTIF(TaxRates!A:A,A2)-1),1))\n\n    ",
    id: 146,
    PostTypeId: 2,
    PostId: 145,
    bounty: 0.02388204548975459,
    UserId: 2,
    upvoteCount: 32
  },
  {
    body:
      "\n\nI need LEFT JOIN ON Table1.userid=Table2.id and delete users from Table1 which has more than 90 days since register date in Table2.registerDate (datetime format). How to build SQL query for this?\n    ",
    title:
      "How to remove users from Table1 which has more than 90 days from register date specified in Table2?",
    id: 147,
    PostTypeId: 1,
    bounty: 0.1753332045181999,
    UserId: 87,
    viewCount: 9,
    upvoteCount: 4,
    comments: 1
  },
  {
    body:
      '\nIt would look something like this:\n\ndelete t1\n    from table1 t1 join\n         table2 t2\n         on t1.userid = t2.id\n    where t1.date > t2.registerdate + interval 90 day;\n\n\nI am not sure if "90 days since" means before or after.  The above tests for dates that are 90 days after the register date.  < t2.registerdate - interval 90 day would be for "before".\n    ',
    id: 148,
    PostTypeId: 2,
    PostId: 147,
    bounty: 0.1753332045181999,
    UserId: 2,
    upvoteCount: 30
  },
  {
    body:
      '\n\nI have the following code\n\nvar pOne = new Promise(function(callback){\n    setTimeout(function(){\n        callback(false);\n    }, 100);\n}).then(function(v){\n    console.log("pOne: " + v);\n});\n\nvar pTwo = new Promise(function(callback){\n    setTimeout(function(){\n        callback(true);\n    }, 100);\n}).then(function(v){\n    console.log("pTwo: " + v);\n});\n\nPromise.all([pOne, pTwo]).then(function(values){\n    console.log(values);\n});\n\n\nThe console.log(values) displays [undefined, undefined] in the console. My understanding of promises is that I should be able to chain the then() method. Does chaining not work with the Promise.all() or is this a bug.\n\nNote: I am using the promise-polyfill but running it on chrome, so it technically it is using native chrome implementation of promises. \n    ',
    title: "Promise.all() after Promise.then() returning undefined values",
    id: 149,
    PostTypeId: 1,
    bounty: 0.10254205283722828,
    UserId: 56,
    viewCount: 10,
    upvoteCount: 20,
    comments: 2
  },
  {
    body:
      "\nyour pOne and pTwo promises don't return anything.\n\nTry this:\n\nvar pOne = new Promise(function(callback){\n    setTimeout(callback, 100, true);\n}).then(function(v){\n    return v;\n});\n\nvar pTwo = new Promise(function(callback){\n    setTimeout(callback, 100, false);\n}).then(function(v){\n    return v;\n});\n\nPromise.all([pOne, pTwo]).then(function(values){\n    console.log(values);\n});\n\n    ",
    id: 150,
    PostTypeId: 2,
    PostId: 149,
    bounty: 0.10254205283722828,
    UserId: 94,
    upvoteCount: 37
  },
  {
    body:
      '\npOne and pTwo have to resolve with a value in order for that value to be passed to the result of Promise.all. \n\nvar pOne = new Promise(function(callback){\n    setTimeout(function(){\n        callback(false);\n    }, 100);\n}).then(function(v){\n    console.log("pOne: " + v);\n    return v;\n});\n\n\nNotice the return v inside of the .then callback. That means that the pOne promise is going to resolve with that value (v in this case being whatever the previous Promise resolved with, or in this case, false.\n\nNow do the same for the pTwo promise.\n\nvar pTwo = new Promise(function(callback){\n    setTimeout(function(){\n        callback(true);\n    }, 100);\n}).then(function(v){\n    console.log("pTwo: " + v);\n    return v;\n});\n\n\nAgain, we have to return a value from the .then callback function in order for the Promise to resolve with a value, rather than with undefined.\n\nNow, Promise.all is going to run the Promises, and when (or if) they resolve (in our case they always do), it\'s going to get the resolved value from each one, and the Promise.all promise itself is going to resolve with the values. \n    ',
    id: 151,
    PostTypeId: 2,
    PostId: 149,
    bounty: 0.10254205283722828,
    UserId: 40,
    upvoteCount: 9
  },
  {
    body:
      "\n\nVery simple react loader\n\nvar webpack = require('webpack');\nvar path = require('path');\n\nvar BUILD_DIR = path.resolve(__dirname, 'static/js/');\nvar APP_DIR = path.resolve(__dirname, 'js');\n\nvar config = {\n    module: {\n        loaders: [\n            {\n                test: /\\.jsx?/,\n                include: APP_DIR,\n                loader: 'babel'\n            },\n        ]\n    },\n    entry: APP_DIR + '/app.jsx',\n    output: {\n        path: BUILD_DIR,\n        filename: 'app.js'\n    }\n};\n\nmodule.exports = config;\n\n\nThen I serve the result using something like the below. It sets some global variables passed from a golang backend, and then loads the bundle.\n\n<script type=\"text/babel\">\n    window.AuthURL = \"{{.AuthURL}}\";\n    window.CODE = GetCode(\"code\");\n    window.APPVERSION = '{{.VERSION }}';\n</script>\n<script src=\"static/js/app.js\"></script>\n\n\napp.jsx looks like \n\nconsole.log(window);\nconsole.log(window.Infinity);\nconsole.log(window.APPVERSION);\n\n\nI get something like this on the console\n\n\n\nThe variables I set show highlighted on the browser, but not visible to webpack. What am I doing wrong? Can I achive the desired bahaviour?\n\n\n    ",
    title: "Webpack missing fields on browser window global",
    id: 152,
    PostTypeId: 1,
    bounty: 0.9291102843561951,
    UserId: 86,
    viewCount: 2,
    upvoteCount: 17,
    comments: 0
  },
  {
    body:
      '\n\nI\'m trying to create a trainer for a game. Which causes a error (I think) because im trying to access the game memory of a 64 bit game with a 32 bit command.\n\nSource code:\n\nusing System;\nusing System.Collections.Generic;\nusing System.ComponentModel;\nusing System.Data;\nusing System.Drawing;\nusing System.Linq;\nusing System.Text;\nusing System.Threading.Tasks;\nusing System.Windows.Forms;\nusing System.Diagnostics;\n\nnamespace Infinite_Trainer___Cod_IW\n{\n    public partial class Form1 : Form\n    {\n        public Form1()\n        {\n            InitializeComponent();\n        }\n\n        private void bunifuImageButton1_Click(object sender, EventArgs e)\n        {\n            this.Close();\n        }\n\n        private void bunifuFlatButton1_Click(object sender, EventArgs e)\n        {\n            string prestigeLevel = bunifuDropdown1.selectedValue;\n            string xp = bunifuSlider1.Value.ToString();\n            string winrate = bunifuMaterialTextbox1.Text;\n            string loserate = bunifuMaterialTextbox2.Text;\n\n            Process[] process = Process.GetProcessesByName("iw7_ship");\n            if (process.Length > 0)\n            {\n                using (CheatEngine.Memory memory = new CheatEngine.Memory(process[0]))\n                {\n                    IntPtr prestigeAddress = memory.GetAddress("\\"iw7_ship.exe\\"+04105320+6E4");\n                    memory.WriteUInt32(prestigeAddress, 1);\n                }\n            }\n            else\n            {\n                MessageBox.Show("Game isn\'t running");\n            }\n        }\n    }\n}\n\n\nAnd the memory.cs class:\n\nusing System;\nusing System.Diagnostics;\nusing System.Text.RegularExpressions;\n\nnamespace Infinite_Trainer___Cod_IW.CheatEngine\n{\n    /// <summary>\n    /// Represents an access to a remote process memory\n    /// </summary>\n    public class Memory : IDisposable\n    {\n        private Process process;\n        private IntPtr processHandle;\n        private bool isDisposed;\n\n        public const string OffsetPattern = "(\\\\+|\\\\-){0,1}(0x){0,1}[a-fA-F0-9]{1,}";\n\n        /// <summary>\n        /// Initializes a new instance of the Memory\n        /// </summary>\n        /// <param name="process">Remote process</param>\n        public Memory(Process process)\n        {\n            if (process == null)\n                throw new ArgumentNullException("process");\n\n            this.process = process;\n            processHandle = Win32.OpenProcess(\n                Win32.ProcessAccessType.PROCESS_VM_READ | Win32.ProcessAccessType.PROCESS_VM_WRITE |\n                Win32.ProcessAccessType.PROCESS_VM_OPERATION, true, (uint)process.Id);\n            if (processHandle == IntPtr.Zero)\n                throw new InvalidOperationException("Could not open the process");\n        }\n\n        #region IDisposable\n\n        ~Memory()\n        {\n            Dispose(false);\n        }\n\n        public void Dispose()\n        {\n            Dispose(true);\n            GC.SuppressFinalize(this);\n        }\n\n        private void Dispose(bool disposing)\n        {\n            if (isDisposed)\n                return;\n            Win32.CloseHandle(processHandle);\n            process = null;\n            processHandle = IntPtr.Zero;\n            isDisposed = true;\n        }\n\n        #endregion\n\n        #region Properties\n\n        /// <summary>\n        /// Gets the process to which this memory is attached to\n        /// </summary>\n        public Process Process\n        {\n            get\n            {\n                return process;\n            }\n        }\n\n        #endregion\n\n        /// <summary>\n        /// Finds module with the given name\n        /// </summary>\n        /// <param name="name">Module name</param>\n        /// <returns></returns>\n        protected ProcessModule FindModule(string name)\n        {\n            if (string.IsNullOrEmpty(name))\n                throw new ArgumentNullException("name");\n            foreach (ProcessModule module in process.Modules)\n            {\n                if (module.ModuleName.ToLower() == name.ToLower())\n                    return module;\n            }\n            return null;\n        }\n\n        /// <summary>\n        /// Gets module based address\n        /// </summary>\n        /// <param name="moduleName">Module name</param>\n        /// <param name="baseAddress">Base address</param>\n        /// <param name="offsets">Collection of offsets</param>\n        /// <returns></returns>\n        public IntPtr GetAddress(string moduleName, IntPtr baseAddress, int[] offsets)\n        {\n            if (string.IsNullOrEmpty(moduleName))\n                throw new ArgumentNullException("moduleName");\n\n            ProcessModule module = FindModule(moduleName);\n            if (module == null)\n                return IntPtr.Zero;\n            else\n            {\n                int address = module.BaseAddress.ToInt32() + baseAddress.ToInt32();\n                return GetAddress((IntPtr)address, offsets);\n            }\n        }\n\n        /// <summary>\n        /// Gets address\n        /// </summary>\n        /// <param name="baseAddress">Base address</param>\n        /// <param name="offsets">Collection of offsets</param>\n        /// <returns></returns>\n        public IntPtr GetAddress(IntPtr baseAddress, int[] offsets)\n        {\n            if (baseAddress == IntPtr.Zero)\n                throw new ArgumentException("Invalid base address");\n\n            int address = baseAddress.ToInt32();\n\n            if (offsets != null && offsets.Length > 0)\n            {\n                byte[] buffer = new byte[4];\n                foreach (int offset in offsets)\n                    address = ReadInt32((IntPtr)address) + offset;\n            }\n\n            return (IntPtr)address;\n        }\n\n        /// <summary>\n        /// Gets address pointer\n        /// </summary>\n        /// <param name="address">Address</param>\n        /// <returns></returns>\n        public IntPtr GetAddress(string address)\n        {\n            if (string.IsNullOrEmpty(address))\n                throw new ArgumentNullException("address");\n\n            string moduleName = null;\n            int index = address.IndexOf(\'"\');\n            if (index != -1)\n            {\n                // Module name at the beginning\n                int endIndex = address.IndexOf(\'"\', index + 1);\n                if (endIndex == -1)\n                    throw new ArgumentException("Invalid module name. Could not find matching \\"");\n                moduleName = address.Substring(index + 1, endIndex - 1);\n                address = address.Substring(endIndex + 1);\n            }\n\n            int[] offsets = GetAddressOffsets(address);\n            int[] _offsets = null;\n            IntPtr baseAddress = offsets != null && offsets.Length > 0 ?\n                (IntPtr)offsets[0] : IntPtr.Zero;\n            if (offsets != null && offsets.Length > 1)\n            {\n                _offsets = new int[offsets.Length - 1];\n                for (int i = 0; i < offsets.Length - 1; i++)\n                    _offsets[i] = offsets[i + 1];\n            }\n\n            if (moduleName != null)\n                return GetAddress(moduleName, baseAddress, _offsets);\n            else\n                return GetAddress(baseAddress, _offsets);\n        }\n\n        /// <summary>\n        /// Gets address offsets\n        /// </summary>\n        /// <param name="address">Address</param>\n        /// <returns></returns>\n        protected static int[] GetAddressOffsets(string address)\n        {\n            if (string.IsNullOrEmpty(address))\n                return new int[0];\n            else\n            {\n                MatchCollection matches = Regex.Matches(address, OffsetPattern);\n                int[] offsets = new int[matches.Count];\n                string value;\n                char ch;\n                for (int i = 0; i < matches.Count; i++)\n                {\n                    ch = matches[i].Value[0];\n                    if (ch == \'+\' || ch == \'-\')\n                        value = matches[i].Value.Substring(1);\n                    else\n                        value = matches[i].Value;\n                    offsets[i] = Convert.ToInt32(value, 16);\n                    if (ch == \'-\')\n                        offsets[i] = -offsets[i];\n                }\n                return offsets;\n            }\n        }\n\n        /// <summary>\n        /// Reads memory at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <param name="buffer">Buffer</param>\n        /// <param name="size">Size in bytes</param>\n        public void ReadMemory(IntPtr address, byte[] buffer, int size)\n        {\n            if (isDisposed)\n                throw new ObjectDisposedException("Memory");\n            if (buffer == null)\n                throw new ArgumentNullException("buffer");\n            if (size <= 0)\n                throw new ArgumentException("Size must be greater than zero");\n            if (address == IntPtr.Zero)\n                throw new ArgumentException("Invalid address");\n\n            uint read = 0;\n            if (!Win32.ReadProcessMemory(processHandle, address, buffer, (uint)size, ref read) ||\n                read != size)\n                throw new AccessViolationException();\n        }\n\n        /// <summary>\n        /// Writes memory at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <param name="buffer">Buffer</param>\n        /// <param name="size">Size in bytes</param>\n        public void WriteMemory(IntPtr address, byte[] buffer, int size)\n        {\n            if (isDisposed)\n                throw new ObjectDisposedException("Memory");\n            if (buffer == null)\n                throw new ArgumentNullException("buffer");\n            if (size <= 0)\n                throw new ArgumentException("Size must be greater than zero");\n            if (address == IntPtr.Zero)\n                throw new ArgumentException("Invalid address");\n\n            uint write = 0;\n            if (!Win32.WriteProcessMemory(processHandle, address, buffer, (uint)size, ref write) ||\n                write != size)\n                throw new AccessViolationException();\n        }\n\n        /// <summary>\n        /// Reads 32 bit signed integer at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <returns></returns>\n        public int ReadInt32(IntPtr address)\n        {\n            byte[] buffer = new byte[4];\n            ReadMemory(address, buffer, 4);\n            return BitConverter.ToInt32(buffer, 0);\n        }\n\n        /// <summary>\n        /// Reads 32 bit unsigned integer at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <returns></returns>\n        public uint ReadUInt32(IntPtr address)\n        {\n            byte[] buffer = new byte[4];\n            ReadMemory(address, buffer, 4);\n            return BitConverter.ToUInt32(buffer, 0);\n        }\n\n        /// <summary>\n        /// Reads single precision value at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <returns></returns>\n        public float ReadFloat(IntPtr address)\n        {\n            byte[] buffer = new byte[4];\n            ReadMemory(address, buffer, 4);\n            return BitConverter.ToSingle(buffer, 0);\n        }\n\n        /// <summary>\n        /// Reads double precision value at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <returns></returns>\n        public double ReadDouble(IntPtr address)\n        {\n            byte[] buffer = new byte[8];\n            ReadMemory(address, buffer, 8);\n            return BitConverter.ToDouble(buffer, 0);\n        }\n\n        /// <summary>\n        /// Writes 32 bit unsigned integer at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <param name="value">Value</param>\n        /// <returns></returns>\n        public void WriteUInt32(IntPtr address, uint value)\n        {\n            byte[] buffer = BitConverter.GetBytes(value);\n            WriteMemory(address, buffer, 4);\n        }\n\n        /// <summary>\n        /// Writes 32 bit signed integer at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <param name="value">Value</param>\n        /// <returns></returns>\n        public void WriteInt32(IntPtr address, int value)\n        {\n            byte[] buffer = BitConverter.GetBytes(value);\n            WriteMemory(address, buffer, 4);\n        }\n\n        /// <summary>\n        /// Writes single precision value at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <param name="value">Value</param>\n        /// <returns></returns>\n        public void WriteFloat(IntPtr address, float value)\n        {\n            byte[] buffer = BitConverter.GetBytes(value);\n            WriteMemory(address, buffer, 4);\n        }\n\n        /// <summary>\n        /// Writes double precision value at the address\n        /// </summary>\n        /// <param name="address">Memory address</param>\n        /// <param name="value">Value</param>\n        /// <returns></returns>\n        public void WriteDouble(IntPtr address, double value)\n        {\n            byte[] buffer = BitConverter.GetBytes(value);\n            WriteMemory(address, buffer, 8);\n        }\n    }\n}\n\n\nSadly I\'m receiving the following error code:\n\nAn unhandled exception of type \'System.ComponentModel.Win32Exception\' occurred in System.dll\n\n\nAdditional information: A 32-bit process can not access modules in a 64-bit process.\n\n\nThis error should be caused by the following line: memory.WriteUInt32(prestigeAddress, 1);\n\nDoes anyone know what I could do now or if there\'s a fix for this? Or do I need a whole new Memory Processing class?\n\nI would appreciate any kind of help\n\nUPDATE\n\nThe new error does look like the following:\n\nAn unhandled exception of type \'System.OverflowException\' occurred in mscorlib.dll\n\nAdditional information: The arithmetic operation has caused an overflow.\n\n\nScreenshot: https://gyazo.com/04107c28a4d7af0599f1dd59c72b6020\n\nFull log:\n\nSystem.OverflowException was unhandled\n  HResult=-2146233066\n  Message=The arithmetic operation caused an overflow.\n  Source=mscorlib\n  StackTrace:\n       at System.IntPtr.ToInt32()\n       at Infinite_Trainer___Cod_IW.CheatEngine.Memory.GetAddress(String moduleName, IntPtr baseAddress, Int32[] offsets) in C:\\Users\\d4ne\\documents\\visual studio 2015\\Projects\\Infinite Trainer - Cod IW\\Infinite Trainer - Cod IW\\CheatEngine\\Memory.cs:Line 109.\n       at Infinite_Trainer___Cod_IW.Form1.bunifuFlatButton1_Click(Object sender, EventArgs e) in C:\\Users\\d4ne\\documents\\visual studio 2015\\Projects\\Infinite Trainer - Cod IW\\Infinite Trainer - Cod IW\\Form1.cs:Line 40.\n       at System.Windows.Forms.Control.OnClick(EventArgs e)\n       at System.Windows.Forms.Control.OnClick(EventArgs e)\n       at System.Windows.Forms.Control.WmMouseUp(Message& m, MouseButtons button, Int32 clicks)\n       at System.Windows.Forms.Control.WndProc(Message& m)\n       at System.Windows.Forms.Label.WndProc(Message& m)\n       at System.Windows.Forms.NativeWindow.DebuggableCallback(IntPtr hWnd, Int32 msg, IntPtr wparam, IntPtr lparam)\n       at System.Windows.Forms.UnsafeNativeMethods.DispatchMessageW(MSG& msg)\n       at System.Windows.Forms.Application.ComponentManager.System.Windows.Forms.UnsafeNativeMethods.IMsoComponentManager.FPushMessageLoop(IntPtr dwComponentID, Int32 reason, Int32 pvLoopData)\n       at System.Windows.Forms.Application.ThreadContext.RunMessageLoopInner(Int32 reason, ApplicationContext context)\n       at System.Windows.Forms.Application.ThreadContext.RunMessageLoop(Int32 reason, ApplicationContext context)\n       at Infinite_Trainer___Cod_IW.Program.Main() in C:\\Users\\d4ne\\documents\\visual studio 2015\\Projects\\Infinite Trainer - Cod IW\\Infinite Trainer - Cod IW\\Program.cs:Line 19.\n       at System.AppDomain._nExecuteAssembly(RuntimeAssembly assembly, String[] args)\n       at System.AppDomain.ExecuteAssembly(String assemblyFile, Evidence assemblySecurity, String[] args)\n       at Microsoft.VisualStudio.HostingProcess.HostProc.RunUsersAssembly()\n       at System.Threading.ExecutionContext.RunInternal(ExecutionContext executionContext, ContextCallback callback, Object state, Boolean preserveSyncCtx)\n       at System.Threading.ExecutionContext.Run(ExecutionContext executionContext, ContextCallback callback, Object state, Boolean preserveSyncCtx)\n       at System.Threading.ExecutionContext.Run(ExecutionContext executionContext, ContextCallback callback, Object state)\n       at System.Threading.ThreadHelper.ThreadStart()\n  InnerException: \n\n    ',
    title: "A 32-bit process can not access modules in a 64-bit process",
    id: 153,
    PostTypeId: 1,
    bounty: 0.2352608314693878,
    UserId: 99,
    viewCount: 8,
    upvoteCount: 37,
    comments: 1
  },
  {
    body:
      "\nCan you check out this32 bit process\n\nCould be your project is targeting 32 instead of 64 bit?\n    ",
    id: 154,
    PostTypeId: 2,
    PostId: 153,
    bounty: 0.2352608314693878,
    UserId: 32,
    upvoteCount: 27
  },
  {
    body:
      "\n\n\n    This question already has an answer here:\n    \n        \n            Generate a random derangement of a list\n                \n                    6 answers\n                \n        \n    \n    \nI would like to random shuffle a list so that each variable in the list when shuffled gets put in a new place in the list.\n\nWhat I am currently doing:\n\nlist = ['a', 'b','c', 'd'];\nrandom.shuffle(list)\n\nlist\n['c','b','d','a']\n\n\nWith this method I shuffle the list but it is still possible to have a variable end up in the same place in this case 'b'.\n\nMy desired output\n\ncompletely shuffled list\n\n['c','a','d','b']\n\n\nI appreciate any help. I am new to python but please let me know if any further information is needed.\n    ",
    title:
      "Python: How to random shuffle a list where each variable will end up in a new place",
    id: 155,
    PostTypeId: 1,
    bounty: 0.27257013903624894,
    UserId: 94,
    viewCount: 3,
    upvoteCount: 23,
    comments: 1
  },
  {
    body:
      "\nSomething like this should do what you want:\n\nimport random\nimport copy\n\ndef super_shuffle(lst):\n    new_lst = copy.copy(lst)\n    random.shuffle(new_lst)\n    for old, new in zip(lst, new_lst):\n        if old == new:\n            return super_shuffle(lst)\n\n    return new_lst\n\n\nExample:\n\nIn [16]: super_shuffle(['a', 'b', 'c'])\nOut[16]: ['b', 'c', 'a']\n\n    ",
    id: 156,
    PostTypeId: 2,
    PostId: 155,
    bounty: 0.27257013903624894,
    UserId: 95,
    upvoteCount: 38
  },
  {
    body:
      "\n\nIam using PHP to push notification to Android and iOS device.\nIt perfect worked. But notifcaiton cannot be show on multi-lines.\n\nI used '\\n' character but it only working on iOS, not working on Android.\n\nHow to show notification on multi-lines on Android device ?\n    ",
    title: "How to break line content of notifications on Android",
    id: 157,
    PostTypeId: 1,
    bounty: 0.4040581476358269,
    UserId: 28,
    viewCount: 9,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      '\nYes, the android notification don\'t use \\n in default style, you should set a text in normal mode (single line) but if you want to use \\n in your text, the NotificationCompat.BigTextStyle() should set,\n\nNotificationCompat.Builder mBuilder =\n        new NotificationCompat.Builder(thisActivity)\n                .setSmallIcon(resourceDrowable)\n                .setContentTitle("My notification")\n                .setContentText("Hello World")\n                .setAutoCancel(true)\n                .setStyle(new NotificationCompat.BigTextStyle().bigText("My\\nMessage"));\n\n    ',
    id: 158,
    PostTypeId: 2,
    PostId: 157,
    bounty: 0.4040581476358269,
    UserId: 33,
    upvoteCount: 21
  },
  {
    body:
      "\n\nI am trying to mock a call to instance of another class from my class. The issue I am seeing is that it looks like my mock object is not being replaced with the real object when I run my test. I made a simple example here to explain the case. Here I want to print tada instead of this is awsome which the method printAwsome() does by default. I have put my code in link below for reference please let me know what am I doing wrong if anything.\n\nhttps://gist.github.com/anonymous/1eab366c60efb75b9075f100a67c851b\n\nExcelSupporTest prints this is awsome instead of tada when I try to mock optionPane.printAwsome() can someone point me to what am I doing wrong here.\n    ",
    title: "Mock External method calls from class In Juints",
    id: 159,
    PostTypeId: 1,
    bounty: 0.18081298255823897,
    UserId: 33,
    viewCount: 10,
    upvoteCount: 35,
    comments: 2
  },
  {
    body:
      "\nTo what I can infer form the question, if you are trying to mock a call to the method showMessageDialog, try mocking DefaultOptionPane as follows: \n\nDefaultOptionPane defaultOptionPane = mock(DefaultOptionPane.class);\nwhen(defaultOptionPane.showMessageDialog(anyObject(), anyObject(), anyString(), anyInt()))\n                .then(//do what you want to do here <Answer>);\n\n\nWhat this simply means as its readable as well is whenever you make a call to showMessageDialog with any set of params you want to return something that you state as an Answer in then.\n    ",
    id: 160,
    PostTypeId: 2,
    PostId: 159,
    bounty: 0.18081298255823897,
    UserId: 6,
    upvoteCount: 30
  },
  {
    body:
      '\nSo long story short unless you pass it in as a  parameter to method you cannot mock the method call. \n\nIt becomes an issue with scoping so replace this\n\n   public void testMethod() {\n        DefaultOptionPane optionPane = new DefaultOptionPane();\n        System.out.println("Entering method");\n        optionPane.printAwsome();\n        System.out.println("Exiting Method");\n      }\n\n\nwith this\n\n public void testMethod(DefaultOptionPane optionPane) {\n\n        System.out.println("Entering method");\n        System.out.println(optionPane.printAwsome());\n        System.out.println("Exiting Method");\n    }\n\n\nand then you can mock the optionPane\n    ',
    id: 161,
    PostTypeId: 2,
    PostId: 159,
    bounty: 0.18081298255823897,
    UserId: 20,
    upvoteCount: 2
  },
  {
    body:
      "\n\nI have an input that's used by JS to control submitting two forms with different actions, but only one of them will be submitted and it should include this input.\n\nI can do it with a hidden input using JS to change their values when the original one changes but I'd like to know if there is an HTML5 solution.\n\nHere is my JS code to do it:\n\n$(function(){\n  $('#originalOne').change(function(){\n    // check if I should disable a form\n    $('.hiddenOnes').val($(this).val());\n  })\n});\n\n    ",
    title: "How to link HTML5 input to two forms",
    id: 162,
    PostTypeId: 1,
    bounty: 0.031265611021977335,
    UserId: 99,
    viewCount: 6,
    upvoteCount: 24,
    comments: 1
  },
  {
    body:
      '\nI think I might be understanding what you are asking, correct me if I\'m wrong:\n\n"Is there a way to update the values in one form based on the values in another using HTML5 only (without using JavaScript)?"\n\nUnfortunately, the answer there is NO. You will need to attach event listeners and handle changes using JavaScript. I had previously suggested using a <fieldset> to group the inputs that you wanted to disable independently, but this method does not work for multiple form actions.\n    ',
    id: 163,
    PostTypeId: 2,
    PostId: 162,
    bounty: 0.031265611021977335,
    UserId: 31,
    upvoteCount: 40
  },
  {
    body:
      '\n\nHey guys I have a question about my code. Here\'s what we have to do:\n"Ask the user to read a file. The file will be in the same format as “items.txt” on the website. There will\nalways be a list of items with a name and price followed by some amount of recipes. If a recipe for an\nitem is not present, the only way to make the item is to buy it directly. Make a program that reads all\nthe items and recipes, then says how much profit can be made by making each item.\nIf an item has no recipe, you would buy that item then resell it for the same price and make a profit of\n0. If an item does have a recipe, you would buy the materials to make this item and subtract this cost\nfrom the price of the final product.\nThere will only be zero or one recipe per item. The items will always be listed first. The names of\nitems will always be a single word (using a _ to join names that are normally multiple words). You\nmay assume there will be less than 50 items and each recipe will use less than 50 other items to create a\nfinal product."\n\nThis is the items1.txt we use \n\nItem: Wood 2.5\nItem: Metal 5.5\nItem: Cat 900\nItem: Spear 50.7\nRecipe: Spear = Wood + Wood + Metal ;\n\n\nI have what I think would work but I can\'t get a certain line to work. I\'m trying to use stod but apparently my school\'s computers don\'t support it. I also tried boost lexical cast and that wouldn\'t work either. \n\nIt says "stod: was not declared in this scope.\n\nHere\'s my code:\n\n#include <iostream>\n#include <fstream>\n#include <cstdlib>\n#include <string>\n#include <algorithm>\n#include <sstream> \n\nusing namespace std;\nstring nextstring(string str, int start_index);\nint split(string str, string a[], int max_size);\n\nint main()\n{   \n    ifstream in_stream;\n\n    string fileName;\n    cout << "Enter the file name : ";\n    cin >> fileName;\n\n    in_stream.open(fileName.c_str());\n\n    //error checking\n    if (in_stream.fail())\n    {\n        cout << "File could not be opened." << endl;\n        exit(1);\n    }\n\n    string items[50];\n    double items_value[50];\n    string recipe[50];\n    string rname = recipe[0];\n    double profit = 0;\n    int j = 0;\n    string lines;\n    int number_of_lines = 0;\n\n    while(getline(in_stream, lines))\n    {  \n        if(lines.substr(0,5) == "Item:")\n            {   \n                int beginning = lines.find_first_of(\' \') + 1;\n                int next_space = lines.find(" ", beginning);\n                items_value[j] = stod(lines.substr(next_space));\n                items[j] = lines.substr(beginning,lines.find_first_of(\' \', beginning) - beginning);\n                j++;\n            }\n\n        if(lines.substr(0,7) == "Recipe:")\n        {           \n            int max_size = lines.length();\n            int cnt = split(lines,recipe,max_size);\n            double profit1 = 0;\n            double profit2 = 0;\n            for(int j = 3; j < cnt; j++)\n            {\n                for(int i = 0; i < 4; i++)\n                    {\n                        if((recipe[j] == items[i]) && (recipe[j] != "+")&& (recipe[j] != ";"))\n                        {\n                        cout << "Making " << items[i] << ", " << "profit = 0" << endl;          \n                        profit1 += items_value[i];                      \n                        }\n                        if(recipe[1] != items[i])\n                        {\n                        profit2 = 0;\n                        }\n                    }\n            }\n            for(int i = 0; i < cnt; i++)\n            {\n                if((recipe[1] == items[i]))\n                {\n\n                    profit = items_value[i];\n                    cout << "Making " << items[i] << ", " << "profit = ";\n                }\n\n            }\n            cout << profit - profit1 << endl;\n\n\n        }   \n    }\n    in_stream.close();\n    return 0; \n}\n\nstring nextstring(string str, int start_index)\n{\n\n    int y =0;\n    y = str.find(\' \',start_index);\n    y = y-start_index;\n    str = str.substr(start_index,y);    \n    return str;\n\n}\n\nint split(string str, string a[], int max_size)\n{\n    int i;\n    int num = 0;\n    for (i=0; i<max_size; i++)\n    {\n\n        a[i] = nextstring(str,num);\n        num = num + a[i].length() + 1;\n\n        if(num >= str.length())\n        {\n            i++;\n            break;\n        }\n    }\n\n    return i;\n} \n\n    ',
    title: "String to double conversion without sstream or boost lexical cast",
    id: 164,
    PostTypeId: 1,
    bounty: 0.4105650515625252,
    UserId: 26,
    viewCount: 5,
    upvoteCount: 9,
    comments: 1
  },
  {
    body:
      "\nFirst step is get a decent compiler from this century ;) stod has been available since c++11, which really means that it was available probably a few years before that.\n\nIf stod isn't available to you then you can revert to the cstdlib function atof.\n    ",
    id: 165,
    PostTypeId: 2,
    PostId: 164,
    bounty: 0.4105650515625252,
    UserId: 89,
    upvoteCount: 26
  },
  {
    body:
      "\n\nI've been searching for something that might help me with my problem all over the internet but I haven't been able to make any progress. I'm new to logic programming and English is not my first language so apologize for any mistake.\n\nBasically I want to implement this prolog program: discord/3 which has arguments L1, L2 lists and P where P are the indexes of the lists where L1[P] != L2[P] (in Java). In case of different lengths, the not paired indexes just fail. Mode is (+,+,-) nondet.\n\nI got down the basic case but I can't seem to wrap my head around on how to define P in the recursive call.\n\ndiscord(_X,[],_Y) :-\n    fail.\ndiscord([H1|T1],[H1|T2],Y) :-\n    ???\n    discord(T1,T2,Z).\ndiscord([_|T1],[_|T2],Y) :-\n    ???\n    discord(T1,T2,Z).\n\n\nThe two clauses above are what I came up to but I have no idea on how to represent Y - and Z - so that the function actually remembers the length of the original list. I've been thinking about using nth/3 with eventually an assert but I'm not sure where to place them in the program.\n\nI'm sure there has to be an easier solution although. Thanks in advance!\n    ",
    title: "List indexes on a recursive program?",
    id: 166,
    PostTypeId: 1,
    bounty: 0.8788949375079567,
    UserId: 84,
    viewCount: 1,
    upvoteCount: 18,
    comments: 1
  },
  {
    body:
      "\nYou can approach this in two ways. First, the more declarative way would be to enumerate the indexed elements of both lists with nth1/3 and use dif/2 to ensure that the two elements are different:\n\n?- L1 = [a,b,c,d],\n   L2 = [x,b,y,d],\n   dif(X, Y),\n   nth1(P, L1, X),\n   nth1(P, L2, Y).\nX = a, Y = x, P = 1 ;\nX = c, Y = y, P = 3 ;\nfalse.\n\n\nYou could also attempt to go through both list at the same time and keep a counter:\n\ndiscord(L1, L2, P) :-\n    discord(L1, L2, 1, P).\n\ndiscord([X|_], [Y|_], P, P) :-\n    dif(X, Y).\ndiscord([_|Xs], [_|Ys], N, P) :-\n    succ(N, N1),\n    discord(Xs, Ys, N1, P).\n\n\nThen, from the top level:\n\n?- discord([a,b,c,d], [a,x,c,y], Ps).\nPs = 2 ;\nPs = 4 ;\nfalse.\n\n    ",
    id: 167,
    PostTypeId: 2,
    PostId: 166,
    bounty: 0.8788949375079567,
    UserId: 53,
    upvoteCount: 40
  },
  {
    body:
      "\n\nI am a beginner in Python and am making a board game where the player enters how many places they want to move left/right etc. however sometimes it moves correctly and sometimes it doesn't. I think it has something to do with my grid array, but I'm not sure... Would be great if someone could help me out, thanks!\n\nchoice=0\nb=0\noldP=0\nnewP=0\nplayer_location='X'\nx=8\ny=0\nxi=0\nyi=0\nup=0\ndown=0\nleft=0\nright=0\nnew_board=[xi][yi]\ngold_coins=0\nbandits=5\ntreasure_chests=10\na=1\nxi2=0\nyi2=0\n\nimport random\ndef menu():\n    print('If you would like to play the Treasure Hunt , press 1')\n    choice=input('If not, press any key to exit')\n    if choice=='1':\n        print('Great! You have made the right choice :)')\n    else:\n        print('Goodbye.')\n        quit()\nmenu()\ndef grid():\n    new_board = [ ]\n\ndef board():\n  new_board = [ ]\n  top_row = [' 1 ',' 2 ',' 3 ',' 4 ',' 5 ',' 6 ',' 7 ',' 8 ']\n\n  new_board.append(top_row)\n\n  for x in range(0,8):\n    row = [' 0 ']*8\n    new_board.append(row)\n  return new_board\n\ndef print_board(b):\n  row_letters = [' ','A','B','C','D','E','F','G','H']\n  i = 0\n  for row in b:\n    print (row_letters[i],''.join(row))\n    i=i+1\nnew_board = board()\nxi=int(8)\nyi=int(0)\nnew_board[xi][yi] = player_location\nprint_board(new_board)\nwhile a==1:\n    upordown=input('Would you like to move up or down? Enter \\'u\\' for up or \\'d\\' for down.').lower()\n    upordown=upordown.lower()\n    while not (upordown== 'u' or upordown== 'd'):\n        print('Invalid input. Please try again')\n        upordown= input().lower()\n    while upordown=='u':\n        try:\n            up=int(input('How many spaces would you like to move up?'))\n            b=0\n        except:\n            print('This is not a valid input, please enter a number.')\n            b=1\n        if b==0:\n            break\n    while upordown=='d':\n        try:\n            down=int(input('How many spaces would you like to move down?'))\n            b=0\n        except:\n            print('This is not a valid input, please enter a number.')\n            b=1\n        if b==0:\n            break\n    leftorright=input('Would you like to move left or right Enter \\'l\\' for left or \\'r\\' for right.').lower()\n    leftorright.lower()\n    while not (leftorright== 'l' or leftorright== 'r'):\n        print('Invalid input. Please try again')\n        leftorright= input().lower()\n    while leftorright=='l':\n        try:\n            left=int(input('How many spaces would you like to move left?'))\n            b=0\n        except:\n            print('This is not a valid input, please enter a number.')\n            b=1\n        if b==0:\n            break      \n    while leftorright=='r':\n        try:\n            right=int(input('How many spaces would you like to move right?'))\n            b=0\n        except:\n            print('This is not a valid input, please enter a number.')\n            b=1\n        if b==0:\n            break\n    print('Okay...')\n\n    grid()\n    while True:\n        board()\n        player_location=' X '\n        if upordown=='d' and leftorright=='l':\n            new_board[y-down][x-left] = player_location\n            new_board = board()\n            xi2=int(xi2-left)\n            yi2=int(yi2-down)\n            print (\"The current x location is\",xi)\n            print (\"The current y location is\",yi)\n            print (\"The amount you chose to go down was\",down)\n            print (\"The amount you chose to go right was\",left)\n            xi = int(xi+left)\n            print(\"The new x location is\",xi2)\n            yi = int(yi+down)\n            print(\"The new y location is\",yi2)\n            print(' ')\n            while 0>xi2 or xi2>8 or 0>yi2 or yi2>8:\n                print('Your move was illegal. Please enter a move that will position you within the grid')\n                left=int(input('Please enter the number of moves you would like to move right'))\n                down=int(input('Please enter the number of moves you would like to move up.'))\n                xi=int(xi+left)\n                yi=int(yi+down)\n            new_board[xi][yi] = player_location\n            print_board(new_board)\n            break\n        elif upordown=='d' and leftorright=='r':\n            new_board = board()\n            xi2=int(xi2+right)\n            yi2=int(yi2-down)\n            print (\"The current x location is\",xi)\n            print (\"The current y location is\",yi)\n            print (\"The amount you chose to go down was\",down)\n            print (\"The amount you chose to go right was\",right)\n            xi = int(xi+right)\n            print(\"The new x location is\",xi2)\n            yi = int(yi+down)\n            print(\"The new y location is\",yi2)\n            print(' ')\n            while 0>xi2 or xi2>8 or 0>yi2 or yi2>8:\n                print('Your move was illegal. Please enter a move that will position you within the grid')\n                right=int(input('Please enter the number of moves you would like to move right'))\n                down=int(input('Please enter the number of moves you would like to move down.'))\n                xi=int(xi+right)\n                yi=int(yi+down)\n            new_board[xi][yi] = player_location\n            print_board(new_board)\n            break\n        elif upordown=='u' and leftorright=='l':\n            new_board = board()\n            xi2=int(xi2+left)\n            yi2=int(yi2-up)\n            print (\"The current x location is\",xi)\n            print (\"The current y location is\",yi)\n            print (\"The amount you chose to go up was\",up)\n            print (\"The amount you chose to go left was\",left)\n            xi = int(xi+left)\n            print(\"The new x location is\",xi2)\n            yi = int(yi-up)\n            print(\"The new y location is\",yi2)\n            print(' ')\n            while 0>xi2 or xi2>8 or 0>yi2 or yi2>8:\n                print('Your move was illegal. Please enter a move that will position you within the grid')\n                left=int(input('Please enter the number of moves you would like to move right'))\n                up=int(input('Please enter the number of moves you would like to move up.'))\n                xi=int(xi-left)\n                yi=int(yi-up)\n            new_board[xi][yi] = player_location\n            print_board(new_board)\n            break\n        elif upordown=='u' and leftorright=='r':\n            new_board = board()\n            xi2=int(xi2+right)\n            yi2=int(yi2+up)\n            print (\"The current x location is\",xi)\n            print (\"The current y location is\",yi)\n            print (\"The amount you chose to go up was\",up)\n            print (\"The amount you chose to go right was\",right)\n            xi = int(xi-right)\n            print(\"The new x location is\",xi2)\n            yi = int(yi+up)\n            print(\"The new y location is\",yi2)\n            print(' ')\n            while 0>xi2 or xi2>8 or 0>yi2 or yi2>8:\n                print('Your move was illegal. Please enter a move that will position you within the grid')\n                right=int(input('Please enter the number of moves you would like to move right'))\n                up=int(input('Please enter the number of moves you would like to move up.'))\n                xi=int(xi-right)\n                yi=int(yi-up)\n            new_board[xi][yi] = player_location\n            print_board(new_board)\n            break\n\n\nI have attached all my code including verification so that the user does not escape the grid as I'm not sure which parts to include to make my problem and program clear.\n    ",
    title: "Why does my array editing not work correctly?",
    id: 168,
    PostTypeId: 1,
    bounty: 0.6834994301822943,
    UserId: 37,
    viewCount: 5,
    upvoteCount: 26,
    comments: 1
  },
  {
    body:
      '\nPractice improvements:\n\nThere\'s a wonderful introduction to debugging here\n\nI strongly recommend incremental programming: you write a few lines, make sure they work, and don\'t continue until you have the existing code correct. That way, when something doesn\'t work, you know it\'s in the last few lines you added. Otherwise, you get to 200 lines of code and not much clue where the error lies.\n\nProgram changes\n\nThis code hasn\'t been designed for debugging or maintenance; you should fix those problems before you go on.  Most of all, you\'ve created two sets of input that perform one task (get the user\'s move) and then four blocks of code that perform the same task (move the user).\n\nInstead, find some usable wording that will have the player enter the move on one line.  You turn that into movement coordinates (such as [1, -2] for "up one and left two"), and then use a single block of code to move through the grid.  Instead of testing four blocks of code, you test one; when you need to make a change, you make one change, not four copies under rotation and reflection.\n\nResult\nThe code you live with should look more like this:\n\ndef get_move():\n    advice  = "Please enter your move in two integers:\\n" +\n              "vertical, then horizontal.  Use positive numbers\\n" +\n              "for up and right, negative for down and left.\\n"\n    example = "For instance, the line \\n\\t2 -1\\n" +\n              "   is 2 spaces up, one space left."\n    move = input(advice + example).split\n    x_move = int(move[0])\n    y_move = int(move[1])\n    # Here, you check move legality; repeat until you get a legal move\n\n    return x_move, y_move\n\nwhile True:\n    print_board()\n    x_move, y_move = get_move()    # get_move contains the input interaction and data checking\n    move(x_move, y_move)  # perform the move; update the board.\n\n\nAlso note that you should probably update the existing board, rather than (apparently) creating a new one for every move.  Stay in this loop until the game is over; don\'t break out on each move.\n\nDoes that move you toward a solution?\n    ',
    id: 169,
    PostTypeId: 2,
    PostId: 168,
    bounty: 0.6834994301822943,
    UserId: 54,
    upvoteCount: 40
  },
  {
    body:
      "\n\nI'm looking to build a microsite that has a fullscreen 360 video. I've been doing some research but can't seem to find the answer. Is it possible to have a full screen 360 video using JWPlayer, Bitmovin or another HTML5 player with static navigation elements on top if it? I think it would be feasible by changing the z index of the top element but haven't been able to verify this. Thank you.\n    ",
    title: "360 Video with navigation menu",
    id: 170,
    PostTypeId: 1,
    bounty: 0.5160446040514299,
    UserId: 36,
    viewCount: 8,
    upvoteCount: 20,
    comments: 1
  },
  {
    body:
      "\nBitmovin Player does support this use case either through the Player API (your own controls that control the player through JavaScript) or by modifying the player Skin (available in Bitmovin-Player v7).\n\nSo let's say you want to overlay a Play button over the video you would just define a  element that then calls .play() on the player instance.\n\n$('.play-button').click(function () {\n  player.play();\n});\n\n\nThe button can then easily be skinned and placed above the player with CSS.\n\nAlthough changing the viewport is not supported through the API or the Controls. These get handled by touch-controls on the Video element (or the device gyro).\n    ",
    id: 171,
    PostTypeId: 2,
    PostId: 170,
    bounty: 0.5160446040514299,
    UserId: 17,
    upvoteCount: 29
  },
  {
    body:
      "\n\nI know this problem is listed at Google Group Mobile Ads section, but it seems that Google is ignoring this issue.\n\nSo I'm trying to avoid the app crash client side with no luck. Surrounding adView.loadAd(adRequest); with a try catch block didn't work.\n\nThe stack trace always the same:\n\njava.lang.NullPointerException: Attempt to invoke virtual method 'boolean java.lang.String.equals(java.lang.Object)' on a null object reference\nat android.app.ResourcesManager.appendLibAssetForMainAssetPath(ResourcesManager.java:859)\nat android.webkit.WebViewDelegate.addWebViewAssetPath(WebViewDelegate.java:205)\nat com.android.webview.chromium.WebViewDelegateFactory$ProxyDelegate.addWebViewAssetPath(WebViewDelegateFactory.java:194)\nat com.android.webview.chromium.WebViewChromium.<init>(WebViewChromium.java:125)\nat com.android.webview.chromium.WebViewChromiumFactoryProvider.createWebView(WebViewChromiumFactoryProvider.java:524)\nat android.webkit.WebView.ensureProviderCreated(WebView.java:2320)\nat android.webkit.WebView.setOverScrollMode(WebView.java:2379)\nat android.view.View.<init>(View.java:4001)\nat android.view.View.<init>(View.java:4118)\nat android.view.ViewGroup.<init>(ViewGroup.java:578)\nat android.widget.AbsoluteLayout.<init>(AbsoluteLayout.java:55)\nat android.webkit.WebView.<init>(WebView.java:627)\nat android.webkit.WebView.<init>(WebView.java:572)\nat android.webkit.WebView.<init>(WebView.java:555)\nat android.webkit.WebView.<init>(WebView.java:542)\nat android.webkit.WebView.<init>(WebView.java:532)\nat com.google.android.gms.ads.internal.webview.m.<init>(:com.google.android.gms.DynamiteModulesA:244)\nat com.google.android.gms.ads.internal.webview.k.a(:com.google.android.gms.DynamiteModulesA:1220)\nat com.google.android.gms.ads.internal.g.a(:com.google.android.gms.DynamiteModulesA:88)\nat com.google.android.gms.ads.internal.o.a(:com.google.android.gms.DynamiteModulesA:106)\nat com.google.android.gms.ads.internal.j.run(:com.google.android.gms.DynamiteModulesA:216)\nat android.os.Handler.handleCallback(Handler.java:751)\nat android.os.Handler.dispatchMessage(Handler.java:95)\nat android.os.Looper.loop(Looper.java:154)\nat android.app.ActivityThread.main(ActivityThread.java:6077)\nat java.lang.reflect.Method.invoke(Native Method)\nat com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:865)\nat com.android.internal.os.ZygoteInit.main(ZygoteInit.java:755)\n\n    ",
    title: "AdMob crashes randomly on adView.loadAd(adRequest)",
    id: 172,
    PostTypeId: 1,
    bounty: 0.10411971051104518,
    UserId: 1,
    viewCount: 7,
    upvoteCount: 38,
    comments: 0
  },
  {
    body:
      '\n\nThis is my first stack overflow post (long time lurker), so sorry in advance if this question isn\'t well worded.\n\nI\'m trying to make a kernel module to emulate keypresses when a user presses a button, and using http://www.staerk.de/thorsten/My_Tutorials/Writing_Linux_kernel_modules as an example.\n\nIt does simulate a keypress when the module is initialized, but when I send an interrupt and try to run the same code the entire virtual machine freezes.\n\nHere\'s snippits of my code:\n\nstatic void got_char(struct work_struct *taskp) \n{\n    struct myprivate *myp = container_of(taskp, struct myprivate, task);\n\n    if ((myp->scancode == 0x01) || (myp->scancode == 0x81))\n    {\n        printk ("You pressed Esc !\\n");\n        println ("Pressed ESC ! \\n");\n        ch=65;\n        tty_insert_flip_char(tty, ch, 0);\n        con_schedule_flip(tty);\n    }\n    else if (myp->scancode == 0x1D) {\n        printk ("You pressed Ctrl!\\n");\n    }\n    else {\n        printk("Scancode = %d", myp->scancode);\n    }\n}\n\nirq_handler_t irq_handler(int irq, void *dev_id, struct pt_regs *regs)\n{\n    static int initialised = 0;\n    /*\n    * Read keyboard status\n    */\n    myp->scancode = inb(0x60);\n\n    if (initialised == 0) {\n        INIT_WORK(&myp->task, got_char);\n        initialised = 1;\n    }\n    else {\n        PREPARE_WORK(&myp->task, got_char);\n    }\n    schedule_work(&myp->task);\n\n    return (irq_handler_t) IRQ_HANDLED;\n}\n\n/* Helper method to print stuff to the terminal */\nstatic void println(char *string)\n{\n    tty = current->signal->tty;\n    (tty->driver->ops)->write (tty, string, strlen(string));\n    ((tty->driver->ops)->write) (tty, "\\015\\012", 2);\n}\n\n/* Initialize the module and Register the IRQ handler */\nstatic int __init keybrd_int_register(void)\n{\n    myp = kmalloc(sizeof (*myp), GFP_KERNEL);\n\n    int result;\n    /* Request IRQ 1, the keyboard IRQ */    \n    result = request_irq (1, (irq_handler_t) irq_handler, IRQF_SHARED, "keyboard_stats_irq", (void *)(irq_handler));\n\n    /* Test simulating keypress */\n    println ("inserting A ! \\n");\n    ch=65;\n    tty_insert_flip_char(tty, ch, 0);\n    con_schedule_flip(tty);\n\n    if (result)\n        printk(KERN_INFO "can\'t get shared interrupt for keyboard\\n");\n\n    return result;\n}\n\n\nEverything works as expected, except for when ESC is pressed, then my entire system just freezes and I have to restart my VM.\n\nI\'ve looked through many posts and forums online and can\'t find an answer.\nAny suggestions would be appreciated, thanks in advance.\n    ',
    title: "Keyboard interrupt handler causing system to freeze",
    id: 173,
    PostTypeId: 1,
    bounty: 0.568233932109697,
    UserId: 72,
    viewCount: 8,
    upvoteCount: 2,
    comments: 0
  },
  {
    body:
      '\n\nI\'m a somewhat beginner at this but I\'m not sure how to code the array so it will let me use the methods like Trim, StartWith, EndWith, Length...\n\nThe error I\'m getting is \n\nList<string> itemDetails does not contain a definition for \'Trim\'\n\n\n(as well as StartsWith, EndsWith, and Length). For the first Remove I\'m getting\n\nNo overload method for \'Remove\' takes 2 arguments.\n\n\nThe second instance of Remove is fine.\n\nI\'m trying to remove the pipe delimiters have the items be displayed in a list box. I haven\'t formatted the list box yet for these items but there will probably be a tab between each detail of the item and each item will be on a new line. I\'m also not too sure if the code I have at the beginning will send what I have to the list box? If you see anything that could be wrong...let me know! Thanks \n\nprivate void frmItemFile_Load(object sender, EventArgs e)\n    {\n        items.Fill();\n        FillItemListBox();\n\n        List<string> itemDetails = Arrays.asList( " |15324|Packaged|3.38|Cheerios|General Mills| ",\n                                 " |15362|Packaged|3.73|Rolled Oats|Quaker| ",\n                                 " |19429|Packaged|12.50|Granulated Sugar|B&H| ",\n                                 " |67256|Fresh|1.46|Bananas|Dole| ",\n                                 " |63851|Fresh|2.29|Apples|Chelan| " );\n\n        itemDetails = itemDetails.Trim();\n        if (itemDetails.StartsWith("|"))\n            itemDetails = itemDetails.Remove(0, 1);\n        if (itemDetails.EndsWith("|"))\n            itemDetails = itemDetails.Remove(itemDetails.Length - 1, 1);\n\n        string[] columns = itemDetails.Split(\'|\');\n        string itemNumber = columns[0];\n        string type = columns[1];\n        string price = columns[2];\n        string description = columns[3];\n        string manufacturer = columns[4];\n    }\n\n    ',
    title: "How do I code an array and then execute Remove,Length...methods?",
    id: 174,
    PostTypeId: 1,
    bounty: 0.25673317258083306,
    UserId: 1,
    viewCount: 6,
    upvoteCount: 19,
    comments: 1
  },
  {
    body:
      '\nYou need to iterate through each item in itemdetails and call the trim methods on that.       \n\n foreach (Var item in itemdetails)\n    {\n      item = item.Trim();\n            if (item.StartsWith("|"))\n                item = item.Remove(0, 1);\n            if (item.EndsWith("|"))\n                item= item.Remove(itemDetails.Length - 1, 1);\n    }\n\n    ',
    id: 175,
    PostTypeId: 2,
    PostId: 174,
    bounty: 0.25673317258083306,
    UserId: 60,
    upvoteCount: 7
  },
  {
    body:
      "\n\nI have a collection of different static .html files. I want to recursively look through all .html files in the current folder and:\n\nreplace all instances of image.jpg with a user string. \n\nreplace all instances of textBlock1 with another user string.  \n\nreplace all instances of textBlock2 with a third user string.\n\nwhere image.jpg/ textBlock1/ textBlock2 are the only ones looked for exactly as written e.g. not tExtblock1\n\nHow do I accomplish this using terminal? Must work on a fresh macOS install.\n\nPrevious answers do not use user input See: Recursive search and replace in text files on Mac and Linux\n    ",
    title: "Replace all instances of a certain phrase with user defined macOS",
    id: 176,
    PostTypeId: 1,
    bounty: 0.20420845414938849,
    UserId: 86,
    viewCount: 8,
    upvoteCount: 39,
    comments: 1
  },
  {
    body:
      '\nThis little bash script should do as you wish. Save it as modhtml and make it executable, just necessary one time, with:\n\nchmod +x modhtml\n\n\nand then you can run it with:\n\n./modhtml\n\n\nHere is the script:\n\n#!/bin/bash\necho -n "Enter string1: "\nread str1\necho -n "Enter string2: "\nread str2\necho -n "Enter string3: "\nread str3\necho DEBUG: str1=$str1\necho DEBUG: str2=$str2\necho DEBUG: str3=$str3\n# Find all files (not directories), in the current directory and below...\n# ... called "*.html" and, for each one, execute "sed" to change...\n# ... image.jpg to str1\n# ... textBlock1 to str2\n# ... textBlock2 to str3\nfind . -type f -name \\*.html -print -exec sed -e "s/image.jpg/$str1/g" -e "s/textBlock1/$str2/g" -e "s/textBlock2/$str3/g" {} \\;\n\n\nAs it stands, it tells you the names of the files it would change and how they will look afterwards but doesn\'t actually change anything.\n\nIf it looks good - make a copy of your files first then run it for real by changing the last line to:\n\nfind . -type f -name \\*.html -exec sed -i.bak -e "s/image.jpg/$str1/g" -e "s/textBlock1/$str2/g" -e "s/textBlock2/$str3/g" {} \\;\n\n\nIf you want the user to be prompted for the string via a GUI-style prompt, rather than in the Terminal, replace the first few lines like this:\n\n#!/bin/bash\nstr1=$(osascript -e \'Tell application "System Events" to display dialog "Enter string1:" default answer ""\' -e \'text returned of result\' 2>/dev/null)\nstr2=$(osascript -e \'Tell application "System Events" to display dialog "Enter string2:" default answer ""\' -e \'text returned of result\' 2>/dev/null)\nstr3=$(osascript -e \'Tell application "System Events" to display dialog "Enter string3:" default answer ""\' -e \'text returned of result\' 2>/dev/null)\necho DEBUG: str1=$str1\necho DEBUG: str2=$str2\necho DEBUG: str3=$str3\n\n\nIt will look like this:\n\n\n    ',
    id: 177,
    PostTypeId: 2,
    PostId: 176,
    bounty: 0.20420845414938849,
    UserId: 13,
    upvoteCount: 39
  },
  {
    body:
      "\n\nI have a nested json i eventually broke down to use with ko.mapping:\n\n{ users: [ { k: 'key', \n             name: 'Alice'\n           }, \n         ],\n  roles: [ { k: 'key', \n             name: 'Standard', \n             regex: [ ( 'root', 'me', 'myself'), \n                     ],\n           },\n         ]\n}\n\n\n...etc.\n\nMy situation is that:\n\n\nmy UI needs a data-bind on vm.users.k, but json data (via $.getJSON or $.ajax) is not jet loaded from server;\nhow can I define the UI, binding a dom element to e.g. vm.users.name, while waiting for ajax request to succeed?\n\n\nI was looking at this question but maybe I miss the point.\n\nMy goal is to define the UI without modeling the initial viewModel, letting it be populated by an Ajax call to server. All nested items and array are needed to became observables.\n\nMy last code after some iterations:\n\nfunction ViewModel( ) {\n    var self = this;\n\n    self.users = ko.observableArray();\n    self.roles = ko.observableArray();\n// etc. logic\n};\n\nvar viewModel = new ViewModel();\nko.applyBindings( viewModel );\n$.getJSON('/api/call/from/server', function( data ){\n    ko.mapping.fromJS( data.users, {}, viewModel.clienti );\n    ko.mapping.fromJS( data.roles, {}, viewModel.procedure );\n});\n\n\nAnd html:\n\n<select name=\"users\" data-bind=\"options: users,\n                                optionsCaption: '',\n                                optionsText: name,\n                                optionsValue: k\">\n\n\nServer side google app engine with headers:\n\nself.response.headers['Content-Type'] = 'application/json; charset=utf-8'\nself.response.out.write( json.dumps( object ) )\n\n\nActually, I don't want to use async: false.\nI managed to broke ko.mapping invocation in three calls from js data.responseJSON, e.g. mapping users to vm.users, then roles to vm.roles, etc.\n    ",
    title: "ko.mapping plugin - Waiting for ajax call to succeed",
    id: 178,
    PostTypeId: 1,
    bounty: 0.5493059570300718,
    UserId: 82,
    viewCount: 4,
    upvoteCount: 39,
    comments: 0
  },
  {
    body:
      '\n\nThe property l.livreobj is undefined below. Why?\n\nfunction livre() {\n            i=i+1;\n            var cd = document.getElementById("act").value.substr(0,3)+"-"+i;\n            var isbn = document.getElementById("isbn").value;\n            var act = document.getElementById("act").value;\n            var titre = document.getElementById("titre").value;\n\n            var livreobj ={\n              Cd:cd,\n              Isbn:isbn,\n              Act:act,\n              Titre:titre\n           };\n\n    }\n\n\n\n        function add() {\n          var l = new livre();\n          alert("kjkj");\n          ajoutertable(l.livreobj);\n        }\n\n\nHTML:\n\n<body>\n code : <input type="text" id="cd" disabled/>\n\n  isbn : <input type="text" id="isbn"/>\n\n  Acteur : <input type="text" id="act"/>\n\n  Titre : <input type="text" id="titre"/>\n\n  <input type="button" id="ajt"  value="Ajouter" onclick="add();"/>\n\n<table border  id = "myTable">\n<tr>\n    <td>\n    Code</td>\n    <td>\n    ISBN</td>\n    <td>\n    Auteur</td>\n    <td>\n    Titre</td>\n    <td>\n    Action</td>\n</tr>\n</table>\n\n    ',
    title: "Object properties are undefined when created with new",
    id: 179,
    PostTypeId: 1,
    bounty: 0.4881729143774627,
    UserId: 91,
    viewCount: 9,
    upvoteCount: 36,
    comments: 2
  },
  {
    body:
      '\nIn your livre() constructor no object properties are initialized. Use "this" pseudo-variable to initialize constructed object field, replace var with this.:\n\n     this.livreobj ={\n          Cd:cd,\n          Isbn:isbn,\n          Act:act,\n          Titre:titre\n       };\n\n\nSee Operator new\n    ',
    id: 180,
    PostTypeId: 2,
    PostId: 179,
    bounty: 0.4881729143774627,
    UserId: 12,
    upvoteCount: 25
  },
  {
    body:
      "\nInitialize variable i to something. Right now it is null\n\n    var i = 0;\n\n    ",
    id: 181,
    PostTypeId: 2,
    PostId: 179,
    bounty: 0.4881729143774627,
    UserId: 41,
    upvoteCount: 17
  },
  {
    body:
      "\n\nI'm creating a basic app to learn Express, but can't seem to set it up right. When I run the app I get a Cannot /GET error. The basic outline is something like this:\n\nIn the top directory - \n\nvar express = require('express');\nvar app = express();\n\nvar getWx = require('./incoming/getWx.js');\n\napp.set('port', process.env.PORT || 1983);\napp.use('/getWx', getWx);\n\napp.listen(1983);\n\n\nThen, in /incoming/getWx.js, I have:\n\nvar express = require('express');\nvar app = express();\n\nvar router = express.Router();\n\nrouter.route('/')\n  .get(function(request, response) {\n    // do thing here \n  })\n\n\nmodule.exports = router;\n\n\nAnything stand out here as wrong? Trying to do this with a router as my app will end up with multiple files. \n    ",
    title: "Cannot /GET - What&#39;s wrong with this Express Server?",
    id: 182,
    PostTypeId: 1,
    bounty: 0.5870247585844497,
    UserId: 33,
    viewCount: 8,
    upvoteCount: 10,
    comments: 1
  },
  {
    body:
      "\nYou get that error because you probably trying to access the path / ...\n\nWhich don't have any router set to handle it...\n\nThe router you set up handles the path /getWx\n\nIf you set stomething like this:\n\napp.use('/', getWx);\n\nThe accessing path / will return something...\n    ",
    id: 183,
    PostTypeId: 2,
    PostId: 182,
    bounty: 0.5870247585844497,
    UserId: 75,
    upvoteCount: 12
  },
  {
    body:
      "\n\nMy program needs to read any type of file from a given directory path and it has to write that information into a byte array.\n\n string combine = Path.Combine(precombine, filename);\n string content = System.IO.File.ReadAllText(combine);\n\n\nThis way I can read a text file however I have to read all kind of files such as music or image and write them into a byte array.\n    ",
    title: "Reading any type of file in C#",
    id: 184,
    PostTypeId: 1,
    bounty: 0.7854229517119373,
    UserId: 93,
    viewCount: 2,
    upvoteCount: 30,
    comments: 1
  },
  {
    body:
      "\nUse the File.ReadAllBytes method \n\nbyte[] fileContent = System.IO.File.ReadAllBytes(combine);\n\n    ",
    id: 185,
    PostTypeId: 2,
    PostId: 184,
    bounty: 0.7854229517119373,
    UserId: 30,
    upvoteCount: 39
  },
  {
    body:
      "\n\nHere's what the error looks like for every single image file I drop into iTunes Connect for my app screens.\n\n\n\nHere is the list of image sizes that supposedly will work (when you click that Learn More link you see this):\n\n\n\nHere are the details of the screenshot I grabbed using Command-S while simulator was running.  Notice that the size seems to match one of the required dimensions.  That was while running an iPhone 6 simulator.\n\n\n\nHere's another one I tried with slightly different dimensions that is supposedly acceptable also, but fails.  I have tried numerous ones and none will upload.\nThis one's while running a 5s simualtor:\n\n\nThis is really annoying since I'm just attempting to release my app but I'm stuck on this (should be) simple thing.\n\nAny help is greatly appreciated.\nThanks\n    ",
    title:
      "Why does iTunes Connect reject all images for App Store saying they are wrong size?",
    id: 186,
    PostTypeId: 1,
    bounty: 0.1322653868732484,
    UserId: 8,
    viewCount: 3,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      '\nAn iPhone 5 is a 4 inch display, not a 4.7 or 5.5 inch display (iPhone 6 & 6+).  The images you have meet the requirements for a 4 inch screen shot, but you are attempting to load these images for the 5.5 inch display.\n\nYou can either upload an iPhone 6+ screen shot and iTunesConnect will automatically scale this image for other screen sizes, or you can select "Other sizes" in iTunesConnect and upload specific screenshots for the specific sizes.\n    ',
    id: 187,
    PostTypeId: 2,
    PostId: 186,
    bounty: 0.1322653868732484,
    UserId: 95,
    upvoteCount: 15
  },
  {
    body:
      "\n\nLet us consider a pandas DataFrame (df) like the one shown above.\n\n\n\nHow do I convert it to a pandas Series?\n    ",
    title: "Convert Pandas DataFrame into Series with multiIndex",
    id: 188,
    PostTypeId: 1,
    bounty: 0.6034644620509595,
    UserId: 96,
    viewCount: 8,
    upvoteCount: 22,
    comments: 2
  },
  {
    body:
      "\nJust select the single column of your frame\n\ndf['Count']\n\n    ",
    id: 189,
    PostTypeId: 2,
    PostId: 188,
    bounty: 0.6034644620509595,
    UserId: 80,
    upvoteCount: 16
  },
  {
    body: "\nresult = pd.Series(df['Count']) \n    ",
    id: 190,
    PostTypeId: 2,
    PostId: 188,
    bounty: 0.6034644620509595,
    UserId: 100,
    upvoteCount: 22
  },
  {
    body:
      '\n\nin my action.js.erb file\n\n$("#performance").html("<%= escape_javascript(render \'performance_table\',questions: @questions, groups: @groups, performances: @performances) %>")\n\n\nin my view\n\n<div class="col-xs-5">\n  <div id="performance">\n   <%= render \'performance_table\', :questions => @questions, :groups => @groups, :performances => @performances  %> \n  </div>\n </div>\n\n\nin my controller_action\n\n@groups = classroom.groups\n@questions = @quiz.questions\n@performances = Array.new\ni = 0\ngroup_ids.each do |g|\n  question_ids.each do |q|\n    @performances.push(Answer.where("group_id = ? AND question_id = ?",g,q).first.userans)\n  end\nend\n\n\nI am making an ajax call to an action and then I in the file of action.js.erb I am updating the html of my div by rendering the same partial but with updated values but partial is not rendering updated values. Kindly let me know what I am doing wrong . console is also showing no error at all\n    ',
    title: "Partial is not being updated after ajax call in Rails",
    id: 191,
    PostTypeId: 1,
    bounty: 0.4266619837379926,
    UserId: 22,
    viewCount: 1,
    upvoteCount: 23,
    comments: 3
  },
  {
    body:
      "\nTry adding an alert message before and after you call .html(). Do both alerts pop up? If so, that means the issue most likely isn't with your javascript. \n    ",
    id: 192,
    PostTypeId: 2,
    PostId: 191,
    bounty: 0.4266619837379926,
    UserId: 15,
    upvoteCount: 23
  },
  {
    body:
      '\nYes this is a problem request must be of type "js", please provide how you are making ajax call?\n that is the view part of it\n    ',
    id: 193,
    PostTypeId: 2,
    PostId: 191,
    bounty: 0.4266619837379926,
    UserId: 38,
    upvoteCount: 1
  },
  {
    body:
      '\nWhy do you replace the existing values of <div id="performance"> </div>. Try to append the new values by using append method in js. \n    ',
    id: 194,
    PostTypeId: 2,
    PostId: 191,
    bounty: 0.4266619837379926,
    UserId: 13,
    upvoteCount: 2
  },
  {
    body:
      '\n\nI\'m trying to get data from uStream using their API and oAuth.  I can get the auth token and that token does work in Rest API Client and I can get data. I however cannot get data in my project... I keep getting 401 unauth.. \n\nCode:\n\n protected void Page_Load(object sender, EventArgs e)\n    {\n        var client = new RestClient("https://www.ustream.tv/oauth2/token");\n        var request = new RestRequest(Method.POST);\n        request.AddHeader("authorization", "Basic xxxxxxxxxxxxxxxxxx");\n        request.AddHeader("content-type", "application/x-www-form-urlencoded");\n        request.AddParameter("application/x-www-form-urlencoded", "client_secret=xxxxxxxxxxxxx&client_id=xxxxxxxxxxxx&grant_type=client_credentials&=", ParameterType.RequestBody);\n        IRestResponse response = client.Execute(request);\n\n        IRestResponse<TokenObject> response2 = (IRestResponse<TokenObject>)client.Execute<TokenObject>(request);\n\n        var tknName = response2.Data.access_token;\n\n        GetData(tknName);\n    }\n\n        public void GetData(string token)\n    {\n        var client = new RestClient("https://api.ustream.tv/channels/206844441.json");\n        var request = new RestRequest(Method.GET);\n        request.AddHeader("authorization", "Bearer" + token);\n        request.AddHeader("content-type", "application/x-www-form-urlencoded");\n\n        IRestResponse jsonResponse = client.Execute(request);\n\n        IRestResponse<Channel> json2Response2 = (IRestResponse<Channel>)client.Execute<Channel>(request);\n\n        var blah = json2Response2.Content;\n    }\n\n\nThe jsonResponse comes back 401... but I can use the token in API client like Insomnia and it will work... I can get data.\n\nAny ideas on what I\'m doing wrong?\n\nThanks!\n    ',
    title: "oAuth uStream API",
    id: 195,
    PostTypeId: 1,
    bounty: 0.16821178753259058,
    UserId: 4,
    viewCount: 9,
    upvoteCount: 26,
    comments: 3
  },
  {
    body:
      '\nAssuming token is not prefixed with a single space, then this line:\n\nrequest.AddHeader("authorization", "Bearer" + token);\n\n\nShould instead be (added a space after Bearer):\n\nrequest.AddHeader("authorization", "Bearer " + token);\n\n\n\n\nAdditionally, the GET request for data does not require the Content-Type header to be added to the request; although including is unlikely to cause an error.\n    ',
    id: 196,
    PostTypeId: 2,
    PostId: 195,
    bounty: 0.16821178753259058,
    UserId: 40,
    upvoteCount: 30
  },
  {
    body:
      '\nAs João mentioned, the main problem will be the missing space character between the string "Bearer" and the token itself . After you fix this i\'m pretty sure it will work.\nYes, Content-Type is superfluous for GET request, but it does not harm the success of your request.\n\nIn addition, you don\'t need to provide client secret twice. That\'s enough to provide it through the Authorization header or the client_secret property in the request body.\n\nSo, that\'s enough to provide the secret that way:\n\nrequest.AddHeader("authorization", "Basic xxxxxxxxxxxxxxxxxx");\n\n\nAnt in this case you shouldn\'t provide the secret again in the request body, here\'s the modified call, based on the original code:\n\nrequest.AddParameter("application/x-www-form-urlencoded", "client_id=xxxxxxxxxxxx&grant_type=client_credentials&=", ParameterType.RequestBody);\n\n    ',
    id: 197,
    PostTypeId: 2,
    PostId: 195,
    bounty: 0.16821178753259058,
    UserId: 63,
    upvoteCount: 14
  },
  {
    body:
      "\nThere were actually two things I had wrong.  First one pointed out by @João Angelo was the missing space between the string: Bearer & token.\n\nSecond and most frustrating was that authorization needed to be Authorization... with the capital A.  Now it works... .Thanks for the help.\n    ",
    id: 198,
    PostTypeId: 2,
    PostId: 195,
    bounty: 0.16821178753259058,
    UserId: 83,
    upvoteCount: 8
  },
  {
    body:
      '\n\nI have seen the basic Python code for a filename replacement in a directory but they are always for known strings, but how would you remove random characters of a certain length?\n\nWould this work?\n\nnewFileName = file.replace([-5:], "")\n\n\nAs I am trying to remove the last five characters from the filename without removing the extension. \n\nHere is an update:\nI am trying to do this:\n\nDMC-CIWS15-AAAA-A00-00-0000-00A-018A-D_014-00_EN-US.xml\n\n\nto\n\nCIWS15-AAAA-A00-00-0000-00A-018A-D.xml\n\n\nwhich removes DMC- and _014-00_EN-US from the end.\n\nI need to add this to a code that will fix a directory of files.\n    ',
    title:
      "removing a string of four characters from the front and thirteen characters from the end of a filename",
    id: 199,
    PostTypeId: 1,
    bounty: 0.17290145974934057,
    UserId: 80,
    viewCount: 9,
    upvoteCount: 35,
    comments: 2
  },
  {
    body:
      "\nThis problem (if I understand it correctly) has a clear separation. Remove extension, remove X characters from beginning and end, and then add the extension again to get the final answer.\n\nimport os\n\noldFileName = 'xxxx-filename-xxxxx.XML'\n# remove n chars in beginning, m chars at end\nn = 5\nm = 6\nname, ext = os.path.splitext(oldFileName)\n# splice away the chars, and add the extension\nnewFileName = '{}{}'.format(name[0:-m][n:], ext)\n# newFileName == 'filename.XML'\n\n\nSo in your case, you would use n=4 and m=13.\n\nIf you didn't know the length, but you knew you wanted everything up to and including the first dash out, and likewise everything after the first underscore (which would mean there couldn't be underscores in the normal filename or the first part of it), this would work also:\n\nimport os\n\noldFileName = 'DMC-CIWS15-AAAA-A00-00-0000-00A-018A-D_014-00_EN-US.xml'\nname, ext = os.path.splitext(oldFileName)\nnewFileName = '{}{}'.format(name[name.index('-')+1:name.index('_')], ext)\n# newFileName == 'CIWS15-AAAA-A00-00-0000-00A-018A-D.xml'\n\n\nAnd even if the pattern is something else, but there is a pattern, you can code to match it, like I have here.\n    ",
    id: 200,
    PostTypeId: 2,
    PostId: 199,
    bounty: 0.17290145974934057,
    UserId: 20,
    upvoteCount: 23
  },
  {
    body:
      "\nIts not nice but I hope this works for you tho\n\nIf you know the files that you want to rename all have the same length, you can try:\n\n>>>file = 'DMC-CIWS15-AAAA-A00-00-0000-00A-018A-D_014-00_EN-US.xml'\n>>>ext = file[51:]\n>>>newFile = file[4:38]+ext\n\n\nwhen you print the newFile you now have:\n\n>>>print(newFile)\nCIWS15-AAAA-A00-00-0000-00A-018A-D.xml\n\n    ",
    id: 201,
    PostTypeId: 2,
    PostId: 199,
    bounty: 0.17290145974934057,
    UserId: 72,
    upvoteCount: 24
  },
  {
    body:
      "\n\nCan I define two values of ItemAvailability as part of the Offer properties of my product mark-up?\n\nI.e. I'd like to show InStock AND InstoreOnly.\n\nGoogle's structured data testing tool doesn't flag an example code containing both values, but I can't find \"live\" examples.\n    ",
    title: "Can I define more than one Schema.org &#39;ItemAvailability&#39;?",
    id: 202,
    PostTypeId: 1,
    bounty: 0.7160929303744772,
    UserId: 84,
    viewCount: 2,
    upvoteCount: 31,
    comments: 1
  },
  {
    body:
      '\nUsing InStock should suffice according to Google Merchant Center Help, as using InStoreOnly implies:\n\n\n  Out of stock (useful if the item is out of stock on your site but available at physical retail shops)\n\n\nUsing both attributes does not throw up any errors in:\n\n\nGoogle Structured Data Testing Tool\nStructured Data Linter\n\n\nBut I would only use InStock.\n\n\n\n<div itemscope itemtype="http://schema.org/Product">\n  <link itemprop="additionalType" href="http://www.productontology.org/id/Microwave_oven" />\n  <span itemprop="name">Kenmore White 17" Microwave</span>\n  <img itemprop="image" src="kenmore-microwave-17in.jpg" alt=\'Kenmore 17" Microwave\' />\n  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">\n    <!--price is 1000, a number, with locale-specific thousands separator\n    and decimal mark, and the $ character is marked up with the\n    machine-readable code "USD" -->\n    <span itemprop="priceCurrency" content="USD">$</span>\n    <span itemprop="price" content="1000.00">1,000.00</span>\n    <link itemprop="availability" href="http://schema.org/InStock"/>In stock\n    <link itemprop="availability" href="http://schema.org/InStoreOnly"/>In store only\n  </div>\n  Product description:\n  <span itemprop="description">0.7 cubic feet countertop microwave. Has six preset cooking categories and convenience features like Add-A-Minute and Child Lock.</span>\n</div>\n\n    ',
    id: 203,
    PostTypeId: 2,
    PostId: 202,
    bounty: 0.7160929303744772,
    UserId: 59,
    upvoteCount: 19
  },
  {
    body:
      '\n\nI want to make a dictionary entry from a file that has several lines: if the line is only numeric, it will be a value, but if it is not (i.e. mostly alpha), it will be the key for the following numbers, until another name comes up in the file. I haven\'t been able to figure out how to get the code to "start over"/continue by making a new key when it reaches the next name.\n\nThe file looks something like this:\n\nGigi:\n0\n2\n3\n2\nBella:\n1\n6\n2\n9\n\n\nAnd I would like to have a dictionary that looks like this:\n\n{Gigi: [0,2,3,2], Bella: [1,6,2,9]}\n\n    ',
    title: "Scores in a file to dictionary in python?",
    id: 204,
    PostTypeId: 1,
    bounty: 0.9125610552377816,
    UserId: 41,
    viewCount: 8,
    upvoteCount: 39,
    comments: 1
  },
  {
    body:
      "\nmy_dict = {}\ncurrent_key = None\nfor line in open('/path/to/file', 'r'):\n    if not line.strip().isdigit():\n        current_key = line.strip()\n        my_dict[current_key] = []\n    else:\n        my_dict[current_key].append(int(line.strip()))\n\n\nFirst set an empty dictionary to add the keys and values to it, then a variable to keep track of the current key until a next non-digit replaces it, finally iterate over the lines in the file, if it is not a digit it is set as the current key and added to the dictionary as an empty list, and if it is a digit it is converted to integer and appended to the dictionary entry of the current key.\n\nEdit:\nThis expects the first line to be a key, if digits appear first, there will be no corresponding key in the dictionary to append the values.\n    ",
    id: 205,
    PostTypeId: 2,
    PostId: 204,
    bounty: 0.9125610552377816,
    UserId: 90,
    upvoteCount: 10
  },
  {
    body:
      "\n\nI find this code in a tutorial\n\n...\nimport configureMockStore from 'redux-mock-store';\n\nconst middleware = [thunk];\nconst mockStore = configureMockStore(middleware);\n...\n\nit('should create BEGIN_AJAX_CALL & LOAD_COURSES_SUCCESS', (done) => {\n\n    const expectedActions = [\n        {type: types.BEGIN_AJAX_CALL},\n        {type: types.LOAD_COURSES_SUCCESS, body: {\n            courses: [{id:'clean-code', title:'Clean Code'}]\n        }}\n    ];\n\n    const store = mockStore({courses:[]}, expectedActions);\n\n    store\n        .dispatch(courseActions.loadCourses())\n        .then(() => {\n            const actions = store.getActions();\n            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);\n            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);\n            done();\n        });\n});\n\n\nand the whole bit with expectedActions doesn't make sense.\n\nThe docs say that if there is a second argument to store, it should be a function; (no explanation telling what that function would do though).\n\nAt first I thought it was forcing some actions into the store for some reason, but a quick console.log told me that wasn't the case.\n\nBecause only dispatch causes actions to accumulate.\n\nSo is it a mistake in the text or some wisdom to explore further?\n    ",
    title: "What is the second argument for?",
    id: 206,
    PostTypeId: 1,
    bounty: 0.4695969657943715,
    UserId: 77,
    viewCount: 5,
    upvoteCount: 32,
    comments: 1
  },
  {
    body:
      "\nThis feature was removed in version 1, but you can find the example in the pre 1 docs.\n\nThe parameter expectedActions is used for testing. You can create a mock store with an array of actions, and then dispatch an the 1st action. This action will cause the other other actions to forwarded (dispatch / next) via thunks/api middleware/etc... The test will check if all of the actions in the expectedActions array have acted on the store:\n\nimport configureStore from 'redux-mock-store';\n\n    const middlewares = []; // add your middlewares like `redux-thunk` \n    const mockStore = configureStore(middlewares);\n\n    // Test in mocha \n    it('should dispatch action', (done) => {\n      const getState = {}; // initial state of the store \n      const action = { type: 'ADD_TODO' };\n      const expectedActions = [action];\n\n      const store = mockStore(getState, expectedActions, done);\n      store.dispatch(action);\n    })\n\n    ",
    id: 207,
    PostTypeId: 2,
    PostId: 206,
    bounty: 0.4695969657943715,
    UserId: 12,
    upvoteCount: 31
  },
  {
    body:
      '\n\nI have three text boxes in my html ,where user can input values. In my java class i am doing validations to check if more than one input box has been entered .If user has entered values in two/three textboxes i need to throw an error message. If he hasnt entered the value in three textboxes also i am planning to throw error messsagae. My code is something like this . \n\n      if(!dId.equals("") && !PId.equals("") && !PPup.equals("")){\n        result.addError(new ErrorBO("only one should only be entered"));\n    }\n\n    if(dId.equals("") && PId.equals("") && PPup.equals("")){\n        result.addError(new ErrorBO(" one should  be entered"));\n    }  \n\n\ndId,PId,PPup are the variables where i have my values. This code fails for the case where the user enters the value in two text boxes. Is there a simplified way to check all the cases. \n    ',
    title: "java Validations to check if more than one textbox has values",
    id: 208,
    PostTypeId: 1,
    bounty: 0.5621922692251793,
    UserId: 21,
    viewCount: 3,
    upvoteCount: 16,
    comments: 1
  },
  {
    body:
      '\nint numEntered = 0\nif(!dId.equals("")) numEntered ++; \nif(!pId.equals("")) numEntered ++;\nif(!pPup.equals("")) numEntered ++;\nif(numEntered != 1) result.addError(new ErrorBO("Enter values in one text box"));\n\n\nBasically, increase a counter every time a text box has entry. If anything but 1 of them has text, return your error.\n    ',
    id: 209,
    PostTypeId: 2,
    PostId: 208,
    bounty: 0.5621922692251793,
    UserId: 5,
    upvoteCount: 31
  },
  {
    body:
      "\n\nI am using sap.m.Datepicker, On clicking of date icon a calendar is rendered showing current month and all dates.\nInstead of showing dates, I only want to show up a calendar with months selection.\n\nDatepicker control showing month dates\n\nDate picker showing months\n(this is what I am looking for, on click of date icon)\n    ",
    title: "Select only month and year on sap.m.Datepicker control Openui5",
    id: 210,
    PostTypeId: 1,
    bounty: 0.7566691552468527,
    UserId: 49,
    viewCount: 2,
    upvoteCount: 17,
    comments: 1
  },
  {
    body:
      "\nCurrently with standard sap.m.Datepicker its not possible to show only months with years.\n\nYou can create a custom control to do this.\n    ",
    id: 211,
    PostTypeId: 2,
    PostId: 210,
    bounty: 0.7566691552468527,
    UserId: 19,
    upvoteCount: 9
  },
  {
    body:
      "\n\nHow to redirect to a different page after user clicks Add: I am trying to redirect the user to a different page called (Thank_you.php) after the user fills out the form fields and clicks Add to submit the form. \n       \n\n   //include the header\n   $page_title = 'Add Company';\n   include ('includes/header.html');\n   echo '<h1>Add Company</h1>';\n\n   require_once ('../mysqli_connect.php');\n   if ($_POST['submitted']){\n     $company_name=$_POST['company_name'];\n     $product_type=$_POST['product_type'];\n     $city=$_POST['city'];\n   $state=$_POST['state'];\n     $query=\"INSERT INTO Company (Company_Name, Product_Type, City, State)\n        Values ('$company_name', '$product_type', '$city','$state')\";\n     $result=@mysqli_query ($dbc, $query);\n     if ($result){\n\n         //echo \"<center><p><b>Thank you.</b></p>\";\n         echo \"<a href=Thank_you.php>The company has been added</a></center>\";            // echo \"<a href=index.php>Show All URLs</a></center>\";\n       }else {\n\n                                //  echo \"<p>The record could not be added due      to a system error\" . mysqli_error() . \"</p>\";\n     }\n   } // only if submitted by the form\n   mysqli_close($dbc);\n   ?>\n   <form action=\"<? echo $PHP_SELF;?>\" method=\"post\"><p>        \n   Company Name:<br> <input name=\"company_name\" size=30><p>\n   Product Type:<br> <input name=\"product_type\" size=30><p>\n   City:<br> <input name=\"city\" size=30><p>\n   State:<br> <input name=\"state\" size=30><p>\n\n  <input type=submit value=Add>\n  <input type=reset value=Clear>\n  <input type=hidden name=submitted value=true>\n  </form>\n  <?\n  //include the footer\n  include (\"includes/footer.html\");\n\n  ?>\n\n    ",
    title: "How to redirect to another page after submit in php",
    id: 212,
    PostTypeId: 1,
    bounty: 0.7606219159649177,
    UserId: 34,
    viewCount: 10,
    upvoteCount: 15,
    comments: 2
  },
  {
    body:
      "\nthis should work\n\n   $page_title = 'Add Company';\n   include ('includes/header.html');\n   echo '<h1>Add Company</h1>';\n\n   require_once ('../mysqli_connect.php');\n   if ($_POST['submitted']){\n     $company_name=$_POST['company_name'];\n     $product_type=$_POST['product_type'];\n     $city=$_POST['city'];\n   $state=$_POST['state'];\n     $query=\"INSERT INTO Company (Company_Name, Product_Type, City, State)\n        Values ('$company_name', '$product_type', '$city','$state')\";\n     $result=@mysqli_query ($dbc, $query);\n     if ($result){\n\n        header(\"Location: Thank_you.php\");\n       }else {\n\n                                //  echo \"<p>The record could not be added due      to a system error\" . mysqli_error() . \"</p>\";\n     }\n   } // only if submitted by the form\n   mysqli_close($dbc);\n   ?>\n   <form action=\"<? echo $PHP_SELF;?>\" method=\"post\"><p>        \n   Company Name:<br> <input name=\"company_name\" size=30><p>\n   Product Type:<br> <input name=\"product_type\" size=30><p>\n   City:<br> <input name=\"city\" size=30><p>\n   State:<br> <input name=\"state\" size=30><p>\n\n  <input type=submit value=Add>\n  <input type=reset value=Clear>\n  <input type=hidden name=submitted value=true>\n  </form>\n  <?\n  //include the footer\n  include (\"includes/footer.html\");\n\n  ?>\n\n    ",
    id: 213,
    PostTypeId: 2,
    PostId: 212,
    bounty: 0.7606219159649177,
    UserId: 70,
    upvoteCount: 16
  },
  {
    body:
      "\nI think header(\"Location: Thank_you.php\"); should work . Updated code will be :\n\n$\n\npage_title = 'Add Company';\n   include ('includes/header.html');\n   echo '<h1>Add Company</h1>';\n\n   require_once ('../mysqli_connect.php');\n   if ($_POST['submitted']){\n     $company_name=$_POST['company_name'];\n     $product_type=$_POST['product_type'];\n     $city=$_POST['city'];\n   $state=$_POST['state'];\n     $query=\"INSERT INTO Company (Company_Name, Product_Type, City, State)\n        Values ('$company_name', '$product_type', '$city','$state')\";\n     $result=@mysqli_query ($dbc, $query);\n     if ($result){\n\n        header(\"Location: Thank_you.php\");\n       }else {\n\n                                //  echo \"<p>The record could not be added due      to a system error\" . mysqli_error() . \"</p>\";\n     }\n   } // only if submitted by the form\n   mysqli_close($dbc);\n   ?>\n   <form action=\"<? echo $PHP_SELF;?>\" method=\"post\"><p>        \n   Company Name:<br> <input name=\"company_name\" size=30><p>\n   Product Type:<br> <input name=\"product_type\" size=30><p>\n   City:<br> <input name=\"city\" size=30><p>\n   State:<br> <input name=\"state\" size=30><p>\n\n  <input type=submit value=Add>\n  <input type=reset value=Clear>\n  <input type=hidden name=submitted value=true>\n  </form>\n  <?\n  //include the footer\n  include (\"includes/footer.html\");\n\n  ?>\n\n    ",
    id: 214,
    PostTypeId: 2,
    PostId: 212,
    bounty: 0.7606219159649177,
    UserId: 63,
    upvoteCount: 32
  },
  {
    body:
      "\n\nI need to invert an original map. which type is <Integer, String>, like {1 = A, 2 = A, 3 = B....}. I want to create a new map which is String to ArrayList because if 1 = A, and 2 = A, than I want to have something like this: A = [1， 2].\n\nSo how can I do that?\n    ",
    title: "Java invert a map",
    id: 215,
    PostTypeId: 1,
    bounty: 0.3776070139589709,
    UserId: 50,
    viewCount: 7,
    upvoteCount: 28,
    comments: 2
  },
  {
    body:
      '\nYou can try this:\n\nHashMap<Integer, String> original = new HashMap<>();\nHashMap<String, ArrayList<Integer>> inverted = new HashMap<>();\n\noriginal.put(1, "A");\noriginal.put(2, "B");\noriginal.put(3, "C");\noriginal.put(4, "A");\n\nfor (Integer key: original.keySet()) {\n    String newKey = original.get(key);\n\n    inverted.computeIfAbsent(newKey, k -> new ArrayList<>());\n    inverted.get(newKey).add(key);\n\n}\nSystem.out.println(original);\nSystem.out.println(inverted);\n\n\nSo, let\'s say HashMap<Integer, String> original is {1=A, 2=B, 3=C, 4=A}, then you will get {A=[1, 4], B=[2], C=[3]}.\n\nEDIT: If you want a more generic version, as @Mr.Polywhirl has suggested, you can use:\n\npublic static final <T, U> Map<U, List<T>> invertMap(Map<T, U> map) {\n    HashMap<U, List<T>> invertedMap = new HashMap<>();\n\n    for (T key : map.keySet()) {\n        U newKey = map.get(key);\n\n        invertedMap.computeIfAbsent(newKey, k -> new ArrayList<>());\n        invertedMap.get(newKey).add(key);\n\n    }\n\n    return invertedMap;\n}\n\n    ',
    id: 216,
    PostTypeId: 2,
    PostId: 215,
    bounty: 0.3776070139589709,
    UserId: 71,
    upvoteCount: 7
  },
  {
    body:
      '\nYou can easily do it using Java 8\'s stream API, below is an example:\n\npublic static void main(String[] args) throws FileNotFoundException {\n\n    Map<Integer, String> map = new HashMap<>();\n    map.put(1, "A");\n    map.put(2, "A");\n    map.put(3, "B");\n\n    Map<String, List<Integer>> invertedMap = map.entrySet()\n    .stream()\n    .collect(Collectors.groupingBy(Entry::getValue, \n            Collectors.mapping(Entry::getKey, Collectors.toList())));\n\n    System.out.println(invertedMap);\n\n}\n\n    ',
    id: 217,
    PostTypeId: 2,
    PostId: 215,
    bounty: 0.3776070139589709,
    UserId: 76,
    upvoteCount: 16
  },
  {
    body:
      '\n\nI have very little knowledge of VBA and tend to record macros through EXCEL and work from there.  I have recorded this macro but instead of replacing specific text I want it to replace text found in any formulas with the text found in a specific cell\n\nSheets("Roulette Summary").Select\nColumns("J:J").Select\nSelection.Replace What:="Test case", Replacement:="Colin", LookAt:=xlPart _\n    , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _\n    ReplaceFormat:=False\n\n\nSo instead of looking for the specific text string \'Test Case\' I want it to look for a text string I have inputted in a cell and replace it with another text string in another cell\n    ',
    title: "Replacing variable text via VBA",
    id: 218,
    PostTypeId: 1,
    bounty: 0.23560767150560946,
    UserId: 48,
    viewCount: 5,
    upvoteCount: 19,
    comments: 2
  },
  {
    body:
      '\nAvoid Select where possible. Set a variable to the value of a cell in your workbook. This can be on a different sheet. Then something like\n\nSub test()\nDim FindMe As String, UseMe As String\n\nFindMe = ThisWorkbook.Worksheets("Sheet1").Range("A1").Value\nUseMe = "Colin"\n\nThisWorkbook.Worksheets("Roulette Summary").Range("J:J").Replace _\n    What:=FindMe, Replacement:=UseMe, LookAt:=xlPart _\n    , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _\n    ReplaceFormat:=False\nEnd Sub\n\n\nIf you set variables at the top of your code, it will be easy and quick to make changes to their values, so you don\'t have to find and replace stuff deep in your code.\n    ',
    id: 219,
    PostTypeId: 2,
    PostId: 218,
    bounty: 0.23560767150560946,
    UserId: 85,
    upvoteCount: 8
  },
  {
    body:
      '\nAvoid using .Select method. Try the below code:\n\nSub Test()\n\n    With Sheets("Roulette Summary")\n        .Columns("J:J").Replace _\n            What:=.Range("A1").Value, _\n            Replacement:=.Range("A2").Value, _\n            LookAt:=xlPart, _\n            SearchOrder:=xlByRows, _\n            MatchCase:=False, _\n            SearchFormat:=False, _\n            ReplaceFormat:=False\n    End With\n\nEnd Sub\n\n\nPut the string to be replaced into cell A1, and replacement string into A2.\n    ',
    id: 220,
    PostTypeId: 2,
    PostId: 218,
    bounty: 0.23560767150560946,
    UserId: 64,
    upvoteCount: 3
  },
  {
    body:
      "\n\nFor example I have \n\nScanner scan = new Scanner(System.in);\nString a = scan.nextLine();\n\n\nLet's suppose a user entered abctd. \n\ngetCharcterBeforeT(example) - need help in this part\n    ",
    title: "How to get a character that is located before another character",
    id: 221,
    PostTypeId: 1,
    bounty: 0.15063514177745096,
    UserId: 42,
    viewCount: 3,
    upvoteCount: 18,
    comments: 1
  },
  {
    body:
      '\nHow about something like this:\n\nimport java.util.Scanner;\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner scan = new Scanner(System.in);\n    System.out.print("Enter a string:");\n    String intialString = scan.nextLine();\n    System.out.print("What is the character you would like to get the character before:");\n    String character = "";\n    while(true){\n      character = scan.nextLine();\n      if(character.length()==1)\n        break;\n      else\n        System.out.print("Please enter only 1 character:");\n    }\n    System.out.println(getCharcterBeforeT(intialString, character.charAt(0)));\n  }\n\n  public static char getCharcterBeforeT(String str, char c){\n    char returnChar = \' \';\n    if (str.indexOf(c) == -1){\n      System.out.println("Character \'" + c + "\' not found");\n    } else if (str.indexOf(c) == 0){\n      System.out.println("Character \'" + c + "\' is at start of string");\n    } else {\n      returnChar = str.charAt(str.indexOf(c) - 1);\n    }\n    return returnChar;\n  }\n}\n\n\nConsole:\n\nEnter a string: abctd\nWhat is the character you would like to get the character before: a\nCharacter \'a\' is at start of string\n\nEnter a string: abctd\nWhat is the character you would like to get the character before: b\na\n\nEnter a string: abctd\nWhat is the character you would like to get the character before: q\nCharacter \'q\' not found\n\n\nTry it here!\n    ',
    id: 222,
    PostTypeId: 2,
    PostId: 221,
    bounty: 0.15063514177745096,
    UserId: 71,
    upvoteCount: 9
  },
  {
    body:
      "\n\nI want to send an email that with a button opens the uber app and gives them the dropoff location.\n\nThe issue here is that when I put the universal deep link from uber in a  element the link redirects to the web login and a pop up appears saying if you want to open the Uber App and if you say yes the App Opens without the parameters I set in the link (the parameters where dropoff and the user's pickup position).\n\nDoes anyone have this issue? Any tips or suggestions?\n\nThe link is: \n\nhttps://m.uber.com/ul?action=setPickup&pickup=my_location&dropoff[latitude]=19.4295176&dropoff[longitude]=-99.1689479&dropoff[nickname]=Koku&dropoff[formatted_address]=1%20Rio%20Lerma%2094B&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d\n\nPS. I have read about the limitations of universal deep links, but this thing does not work properly (not in IOS and not in android).\n    ",
    title: "Uber universal deep link in mailing not working",
    id: 223,
    PostTypeId: 1,
    bounty: 0.03161046757331176,
    UserId: 83,
    viewCount: 1,
    upvoteCount: 25,
    comments: 0
  },
  {
    body:
      "\n\nI am working on a class assignment to exploit the stack overflow vulnerability.\n\nIn this particular scenario, ASLR is turned off but code can not run on stack.\n\nTherefore I came up with the following exploit to input to the program\n\n{PADDING} + {&SYSTEM CALL} + {&EXIT CALL} + {CMD TO PASS TO SYSTEM CALL}\n\nThe idea is, padding will fill from the buffer to the return address, the return address is a call to system, the return address from system will be an exit call, and the argument passed to system will be the address of the SHELL env variable.\n\nThis is how i obtain the address to system\n\n\n\nNow, when I use the address of the actual function 0x080483f0, my exploit works perfectly, if I use the address to call, it breaks. \n\nWhy is that? what is the difference? Thanks!\n    ",
    title: "Stack overflow exploit, calling system",
    id: 224,
    PostTypeId: 1,
    bounty: 0.41421352126579936,
    UserId: 19,
    viewCount: 4,
    upvoteCount: 4,
    comments: 0
  },
  {
    body:
      "\n\nI have a dataset which is a DataSet of String and it has the data\n\n12348,5,233,234559,4\n12348,5,233,234559,4\n12349,6,233,234560,5\n12350,7,233,234561,6\n\n\nI want to figure out the duplicate rows in a dataset, how do i do that?    I would like to remove the duplicates. in the example, the duplicated row is 12348,5,233,234559,4 and I want to output just a single instance of it\n\nHow do i go about doing it?\n    ",
    title: "Finding out duplicates in a dataset in scala",
    id: 225,
    PostTypeId: 1,
    bounty: 0.7484545531502209,
    UserId: 63,
    viewCount: 2,
    upvoteCount: 36,
    comments: 3
  },
  {
    body:
      '\nDimas answer should work. Here is another solution.\n\nI think (not positive) groupby would hold all of the data in memory.. so perhaps this would be better for you.\n\nval rows = scala.io.Source.fromFile("data.txt") // Assuming data is in a file\n             .getLines  // Create an iterator from lines in file\n             .foldLeft(Map.empty[String, Int]){ // Fold over empty Map\n                (acc, row) => acc + (row -> (acc.getOrElse(row, 0) + 1))}  // Keep accumulator to track of row counts as fold is done\n             .filter(t => t._2 > 1)  // Filter to tuples with more than one row\n\n\nI\'m new to scala myself, I actually spent a while answering this as practice haha. Confusing, but it makes sense!\n\nThink of a Map like a dictionary. You can store pairs in it. In scala, you can add/update a key/value pair by adding a pair to it.\nMap(b -> 4) + ("c" -> 2) would return Map(b -> 4, c -> 2). Expanding on that, Map(b -> 4, c -> 2) + ("b" -> 1) returns Map(b -> 1, c -> 2). What acc is (renamed from count for clarity) is the accumulator of a growing object as the iterator is folded. Each time it hits a new row, it is checking to see if that row has is in the Map yet (again, think dictionary). If the value is there, it takes the previous value with getOrElse and adds 1 to it, then updates the acc Map with that new pair, or it initializes it at one if it doesn\'t exist yet (since it was the first time the row was seen).\n\nHere is the best blog I found for learning folding. The author describes it succinctly and accurately: https://coderwall.com/p/4l73-a/scala-fold-foldleft-and-foldright\n    ',
    id: 226,
    PostTypeId: 2,
    PostId: 225,
    bounty: 0.7484545531502209,
    UserId: 24,
    upvoteCount: 5
  },
  {
    body:
      "\ndataSet.groupBy(identity).collect { case (k,v) if v.size > 1 => k }\n    ",
    id: 227,
    PostTypeId: 2,
    PostId: 225,
    bounty: 0.7484545531502209,
    UserId: 76,
    upvoteCount: 34
  },
  {
    body:
      "\nIf you use scala collections (Like Seq, List) you have a method called .distinct. Otherwise you can transform it in a Set which removes duplicates by default (but doesn't conserve the order)\n    ",
    id: 228,
    PostTypeId: 2,
    PostId: 225,
    bounty: 0.7484545531502209,
    UserId: 91,
    upvoteCount: 5
  },
  {
    body:
      "\n\nI have a trivial server that uses SSL via a self-signed cert. I am trying to use the Python 3.4.2 SSL socket library to create a connection and return data via the following script with associated error:\n\nimport socket, ssl\n\ns = socket.socket(socket.AF_INET,socket.SOCK_STREAM)\n\nssl_socket = ssl.wrap_socket(s, keyfile=\"/path/to/server.pem\", certfile=\"/path/to/client.pem\", cert_reqs=ssl.CERT_REQUIRED, ssl_version=ssl.PROTOCOL_TLSv1_2, ca_certs=\"/path/to/client.pem\")\n\nssl_socket.connect(('hostname', port))\nssl_socket.send(\"data_string\".encode())\n# returns '4' (number of returned bytes)\nssl_socket.setblocking(0) # turn off blocking\nssl_socket.recv(4096)\n# error: ssl.SSLWantReadError: The operation did not complete (read) (_ssl.c:1960)\n\n\nAnd if I don't set the blocking to 0, it will just hang. I've done enough research to see that it has to do with the size of the returned data, but I'm getting a return value of 4 bytes with I call ssl_socket.send(), so I'm not sure what I am missing.\n\nNote that I have a perl client that works properly as follows for context:\n\n#!/usr/bin/env perl\n\nuse IO::Socket::INET;\nuse IO::Socket::SSL;\n\n# auto-flush on socket\n$| = 1;\n\n# create a connecting socket\nmy $socket = new IO::Socket::SSL (\n    PeerHost => 'hostname',\n    PeerPort => '12345',\n    Proto => 'tcp',\n    SSL_cert_file => $ENV{'HOME'} . '/path/to/client.pem',\n    SSL_key_file => $ENV{'HOME'} . '/path/to/server.pem',\n);\ndie \"cannot connect to the server $!\\n\" unless $socket;\nprint \"connected to the server\\n\";\n\n# data to send to a server\nmy $req = 'data';\nprint $socket \"$req\\n\";\nmy @r = ( <$socket> ) ;\nprint \"@r\";\n\n$socket->close();\n\n\nWith output:\n\nconnected to the server\n{\n   \"password\": \"passwd\",\n   \"username\": \"username\"\n}\n\n\nWhat is the proper way to use the Python SSL library to retrieve my requested data?\n    ",
    title:
      "Python SSL socket error: ssl.SSLWantReadError: The operation did not complete (read)",
    id: 229,
    PostTypeId: 1,
    bounty: 0.825130299270312,
    UserId: 65,
    viewCount: 1,
    upvoteCount: 24,
    comments: 1
  },
  {
    body:
      "\nAnswer: needed a '\\n' character at the end of my data string.\n    ",
    id: 230,
    PostTypeId: 2,
    PostId: 229,
    bounty: 0.825130299270312,
    UserId: 25,
    upvoteCount: 3
  },
  {
    body:
      '\n\nI have the following code, I am using two components, one called Moustaches and the other called Moustache\n\nI am trying to show the data from Moustache inside Moustaches using a v-for\n\nI am not getting any data or any errors, the Moustaches html is showing in the source code but not the Moustache data.\n\nHTML\n\n<div id="app">\n    <moustaches>\n        <moustache name="The Burgundy" img="/img/the-burgundy.jpg"></moustache>\n        <moustache name="The Borat" img="/img/the-borat.jpg"></moustache>\n        <moustache name="The Santana" img="/img/the-santana.jpg"></moustache>\n    </moustaches>\n</div>\n\n\nJS\n\n    Vue.component(\'moustaches\', {\n    template: `\n        <div>\n            <ul class="list-inline">\n                <li v-for="moustache in moustaches">\n                    <p>\n                        <strong>@{{ moustache.name }}</strong>\n                    </p>\n                    <img width="300" height="200" :src="moustache.img">\n                    <button \n                        class="btn btn-primary" \n                        :data-type="moustache.name"\n                        >\n                            Vote\n                    </button>\n                </li>\n            </ul>\n        </div>\n    `,\n\n    mounted() {\n        console.log(this.$children);\n    },\n\n    data() {\n        return { moustaches: [] };\n    },\n\n    created() {\n        this.moustaches = this.$children;\n      }\n});\n\nVue.component(\'moustache\', {\n    template: `\n        <div><slot></slot></div>\n    `,\n\n    props: {\n        name: { required: true },\n        img: { required: true},\n        selected: { default: false }\n    }\n\n});\n\nnew Vue({\n    el: \'#app\'\n});\n\n\nRendered HTML\n\n<div><ul class="list-inline"></ul></div>\n\n    ',
    title: "Vuejs - Data not showing in array - No errors",
    id: 231,
    PostTypeId: 1,
    bounty: 0.11897991044621525,
    UserId: 14,
    viewCount: 7,
    upvoteCount: 5,
    comments: 2
  },
  {
    body:
      '\nI\'m not 100% what you\'re trying to accomplish, but I think you\'ve misunderstood how slots work. \n\nSlots\n\nThe <slot> element lets you distribute content into a component. Here is a small example: \n\n\n\nVue.component(\'child-component\', {\n  template: \'#child-component\'\n});\n\nnew Vue({\n  el: \'#app\',\n  data: { message: \'Hello I have been slotted\' }\n});\n  \n<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.4/vue.js"></script>\n<div id="app">\n  <child-component>\n    {{ message }}\n  </child-component>\n</div>\n\n<template id="child-component">\n  <div>\n    <p>Above the slot</p>\n    <slot></slot>\n    <p>Below the slot</p>\n  </div>\n</template>\n\n\n\n\nEssentially, any html between the component tags gets put into the slot. You can read more about slots in the documentation here.\n\nThe Problem\n\nYou have tried to slot three moustache components into moustaches, but moustaches doesn\'t have a slot. \n\nAlso, you have given the moustache components slots, but haven\'t slotted anything in.\n\nSolution #1\n\nAdd a slot to the moustaches component. Because the moustache components are empty divs, they will not  show up on the page. Here is a working code snippet:\n\n\n\nVue.component(\'moustaches\', {\n  template: \'#moustaches\',\n  data() {\n    return { moustaches: [] };\n  },\n  created() {\n    this.moustaches = this.$children;\n  }\n});\n\nVue.component(\'moustache\', {\n  template: \'<div><slot></slot></div>\',\n\n  props: {\n    name: { required: true },\n    img: { required: true},\n    selected: { default: false }\n  }\n\n});\n\nnew Vue({\n  el: \'#app\'\n});\n<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.4/vue.js"></script>\n\n<div id="app">\n  <moustaches>\n    <moustache name="The Burgundy" img="/img/the-burgundy.jpg"></moustache>\n    <moustache name="The Borat" img="/img/the-borat.jpg"></moustache>\n    <moustache name="The Santana" img="/img/the-santana.jpg"></moustache>\n  </moustaches>\n</div>\n\n<template id="moustaches">\n  <div>\n    <ul class="list-inline">\n      <li v-for="moustache in moustaches">\n        <p>\n          <strong>@{{ moustache.name }}</strong>\n        </p>\n        <img width="300" height="200" :src="moustache.img">\n        <button \n                class="btn btn-primary" \n                :data-type="moustache.name"\n                >\n          Vote\n        </button>\n      </li>\n    </ul>\n    <slot></slot>\n  </div>\n</template>\n\n\n\n\nI do not recommend this approach, because you are using the slot only to pass data. Slots should be used to pass html, not data. It is a strange way of doing things and you\'ll likely run into other bugs.\n\nSolution #2\n\nInstead of using a slot to pass data, you should be passing data via props. By moving the data out of the html, and into the parent component, we can get rid of all slots and the moustache component entirely:\n\n\n\nVue.component(\'moustaches\', {\n  template: \'#moustaches\',\n  props: [\'moustaches\'],\n});\n\nnew Vue({\n    el: \'#app\',\n    data: {\n    \tmoustaches: [\n        { name: "The Burgundy", img: "/img/the-burgundy.jpg" },\n        { name: "The Borat", img: "/img/the-borat.jpg" },\n        { name: "The Santana", img: "/img/the-santana.jpg" },\n      ]\n    }\n});\n<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.4/vue.js"></script>\n\n<div id="app">\n  <moustaches :moustaches="moustaches"></moustaches>\n</div>\n\n<template id="moustaches">\n  <div>\n    <ul class="list-inline">\n      <li v-for="moustache in moustaches">\n        <p>\n          <strong>@{{ moustache.name }}</strong>\n        </p>\n        <img width="300" height="200" :src="moustache.img">\n        <button \n                class="btn btn-primary" \n                :data-type="moustache.name"\n                >\n          Vote\n        </button>\n      </li>\n    </ul>\n  </div>\n</template>\n\n\n\n    ',
    id: 232,
    PostTypeId: 2,
    PostId: 231,
    bounty: 0.11897991044621525,
    UserId: 36,
    upvoteCount: 39
  },
  {
    body:
      "\nThe above poster kindly answered the question much better than I could but TL:DR answer is I was missing <slot></slot> in the Moustaches component.\n\nI just added it below the closing div and it worked.\n    ",
    id: 233,
    PostTypeId: 2,
    PostId: 231,
    bounty: 0.11897991044621525,
    UserId: 82,
    upvoteCount: 13
  },
  {
    body:
      "\n\nI have query results as follow:  \n\nSELECT ... ON CIA_factbook_dataset.my_name = World_Bank_dataset.my_name ...\n\n+----------------+------+-------------+-----------------+---------+--------+\n| my_name        | Year | CIA_name    | World_Bank_name | CIA_GDP | WB_GDP |\n+----------------+------+-------------+-----------------+---------+--------+\n| United Kingdom | 2010 | UK          | United Kingdom  | 2850    | 2800   |\n| United Kingdom | 2010 | UK          | Channel Islands | 2850    |   11   |\n| Cyprus         | 2010 | CYPRUS TURK | CYPRUS TURK     |   22    |   22   |\n| Cyprus         | 2010 | CYPRUS TURK | CYPRUS GRK      |   22    |   33   |\n| Cyprus         | 2010 | CYPRUS GRK  | CYPRUS TURK     |   33    |   22   |\n| Cyprus         | 2010 | CYPRUS GRK  | CYPRUS GRK      |   33    |   33   |\n+----------------+------+-------------+-----------------+---------+--------+\n\n\nI need to calculate the sum of the sub-country data, But if I'm using just GROUP BY my_name,year, it calculates the sum of the same number few times.  \n\nThe final result should be:  \n\n+----------------+------+---------+--------+\n| my_name        | Year | CIA_GDP | WB_GDP |\n+----------------+------+---------+--------+\n| United Kingdom | 2010 | 2850    | 2811   |\n| Cyprus         | 2010 |   55    |   55   |\n+----------------+------+---------+--------+\n\n\nInstead of:  \n\n+----------------+------+---------+--------+\n| my_name        | Year | CIA_GDP | WB_GDP |\n+----------------+------+---------+--------+\n| United Kingdom | 2010 | 5700    | 2811   |\n| Cyprus         | 2010 |  110    |  110   |\n+----------------+------+---------+--------+\n\n\nHow to achieve that?\nAny better way than to use SUM(distinct CIA_GDP),SUM(distinct WB_GDP)?\n(Theoretically, the GDP of turkish cyprus and greek cyprus might be the same)\n    ",
    title: "sum when join repeating lines (SQL)",
    id: 234,
    PostTypeId: 1,
    bounty: 0.7696809420817143,
    UserId: 3,
    viewCount: 3,
    upvoteCount: 30,
    comments: 2
  },
  {
    body:
      "\nFor this I'm assuming my_name, Year is unique in both tables.\n\nSQL Fiddle\n\nSELECT t1.my_name, t1.YEAR, SUM_CIA_GDP, SUM_WB_GDP\nFROM (\n    SELECT DISTINCT my_name, YEAR, SUM(CIA_GDP) AS SUM_CIA_GDP\n    FROM t\n    GROUP BY my_name, YEAR, WB_GDP\n    ) t1\nJOIN (   \n    SELECT DISTINCT my_name, YEAR, SUM(WB_GDP) AS SUM_WB_GDP\n    FROM t\n    GROUP BY my_name, YEAR, CIA_GDP\n    ) t2 \n    ON t1.my_name = t2.my_name \n        AND t1.YEAR = t2.YEAR\n\n\nResults:\n\n|        my_name | YEAR | SUM_CIA_GDP | SUM_WB_GDP |\n|----------------|------|-------------|------------|\n|         Cyprus | 2010 |          55 |         55 |\n| United Kingdom | 2010 |        2850 |       2811 |\n\n    ",
    id: 235,
    PostTypeId: 2,
    PostId: 234,
    bounty: 0.7696809420817143,
    UserId: 12,
    upvoteCount: 37
  },
  {
    body:
      "\nSQL Fiddle\n\nMySQL 5.6 Schema Setup:\n\nCREATE TABLE t\n    (`my_name` varchar(14), `Year` int, `CIA_name` varchar(11), `World_Bank_name` varchar(15), `CIA_GDP` int, `WB_GDP` int)\n;\n\nINSERT INTO t\n    (`my_name`, `Year`, `CIA_name`, `World_Bank_name`, `CIA_GDP`, `WB_GDP`)\nVALUES\n    ('United Kingdom', 2010, 'UK', 'United Kingdom', 2850, 2800),\n    ('United Kingdom', 2010, 'UK', 'Channel Islands', 2850, 11),\n    ('Cyprus', 2010, 'CYPRUS TURK', 'CYPRUS TURK', 22, 22),\n    ('Cyprus', 2010, 'CYPRUS TURK', 'CYPRUS GRK', 22, 33),\n    ('Cyprus', 2010, 'CYPRUS GRK', 'CYPRUS TURK', 33, 22),\n    ('Cyprus', 2010, 'CYPRUS GRK', 'CYPRUS GRK', 33, 33)\n;\n\n\nQuery 1:\n\nSELECT my_name, Year, SUM(CIA_GDP), WB_GDP\nFROM (\n  SELECT my_name, Year, CIA_GDP, SUM(WB_GDP) WB_GDP\n  FROM t\n  GROUP BY my_name, Year, CIA_GDP\n  ) t1\nGROUP BY my_name, Year, WB_GDP\n\n\nResults:\n\n|        my_name | Year | SUM(CIA_GDP) | WB_GDP |\n|----------------|------|--------------|--------|\n|         Cyprus | 2010 |           55 |     55 |\n| United Kingdom | 2010 |         2850 |   2811 |\n\n    ",
    id: 236,
    PostTypeId: 2,
    PostId: 234,
    bounty: 0.7696809420817143,
    UserId: 39,
    upvoteCount: 33
  },
  {
    body:
      "\n\nI am making a function that returns a Boolean type of whether a String has enough tokens. I do this by using this code:\n\npublic boolean isEnoughTokens(int tokens, String problem) {\n        try {\n            StringTokenizer token = new StringTokenizer(problem);\n            return true;\n        } catch (NoSuchElementException ) {\n\n        }\n    }\n\n\nThe problem is that I haven't figured out how to catch a No such element exception. I think it's super simple but still didn't figure out how to do it.\n\nThanks, any help will be appreciated!!!\n    ",
    title: "How do I catch a NoSuchElementException?",
    id: 237,
    PostTypeId: 1,
    bounty: 0.04750578231431857,
    UserId: 19,
    viewCount: 8,
    upvoteCount: 18,
    comments: 2
  },
  {
    body:
      '\nHere\'s how I might do it.  Not what you had in mind, but I wanted to show you JUnit.\n\nStringUtils.java:\n\npackage utils;\n\nimport java.util.Arrays;\nimport java.util.List;\n\n/**\n * @author Michael\n * @link https://stackoverflow.com/questions/41006856/how-do-i-catch-a-nosuchelementexception?noredirect=1#comment69222264_41006856\n */\npublic class StringUtils {\n\n    private StringUtils() {}\n\n    public static List<String> tokenize(String str) {\n        String [] tokens = new String[0];\n        if (isNotBlankOrNull(str)) {\n            str = str.trim();\n            tokens = str.split("\\\\s+");\n        }\n        return Arrays.asList(tokens);\n    }\n\n    public static boolean isBlankOrNull(String s) {\n        return ((s == null) || (s.trim().length() == 0));\n    }\n\n    public static boolean isNotBlankOrNull(String s) {\n        return !isBlankOrNull(s);\n    }\n\n    public static boolean hasSufficientTokens(int numTokens, String str) {\n        return (numTokens >= 0) && tokenize(str).size() >= numTokens;\n    }\n}\n\n\nStringUtilsTest.java:\n\npackage utils;\n\nimport org.junit.Assert;\nimport org.junit.Test;\n\nimport java.util.Arrays;\nimport java.util.Collections;\nimport java.util.List;\n\n/**\n * Created by Michael\n * Creation date 12/6/2016.\n * @link https://stackoverflow.com/questions/41006856/how-do-i-catch-a-nosuchelementexception?noredirect=1#comment69222264_41006856\n */\npublic class StringUtilsTest {\n\n    @Test\n    public void testIsNotBlankOrNull_NullString() {\n        Assert.assertFalse(StringUtils.isNotBlankOrNull(null));\n    }\n\n    @Test\n    public void testIsNotBlankOrNull_EmptyString() {\n        Assert.assertFalse(StringUtils.isNotBlankOrNull(""));\n    }\n\n    @Test\n    public void testIsNotBlankOrNull_BlankString() {\n        Assert.assertFalse(StringUtils.isNotBlankOrNull("        "));\n    }\n\n    @Test\n    public void testIsNotBlankOrNull_FullString() {\n        Assert.assertTrue(StringUtils.isNotBlankOrNull("I\'m not null, blank, or empty"));\n    }\n\n    @Test\n    public void testTokenize_NullString() {\n        // setup\n        List<String> expected = Collections.EMPTY_LIST;\n        // exercise\n        List<String> actual = StringUtils.tokenize(null);\n        // assert\n        Assert.assertEquals(expected, actual);\n    }\n\n    @Test\n    public void testTokenize_EmptyString() {\n        // setup\n        List<String> expected = Collections.EMPTY_LIST;\n        // exercise\n        List<String> actual = StringUtils.tokenize("");\n        // assert\n        Assert.assertEquals(expected, actual);\n    }\n\n    @Test\n    public void testTokenize_BlankString() {\n        // setup\n        List<String> expected = Collections.EMPTY_LIST;\n        // exercise\n        List<String> actual = StringUtils.tokenize("        ");\n        // assert\n        Assert.assertEquals(expected, actual);\n    }\n\n    @Test\n    public void testTokenize_FullString() {\n        // setup\n        List<String> expected = Arrays.asList("I\'m", "not", "null,", "blank,", "or", "empty");\n        // exercise\n        List<String> actual = StringUtils.tokenize("    I\'m not     null,    blank, or empty    ");\n        // assert\n        Assert.assertEquals(expected.size(), actual.size());\n        Assert.assertEquals(expected, actual);\n    }\n\n    @Test\n    public void hasSufficientTokens_NegativeTokens() {\n        // setup\n        int numTokens = -1;\n        String str = "    I\'m not     null,    blank, or empty    ";\n        // exercise\n        // assert\n        Assert.assertFalse(StringUtils.hasSufficientTokens(numTokens, str));\n    }\n\n    @Test\n    public void hasSufficientTokens_InsufficientTokens() {\n        // setup\n        String str = "    I\'m not     null,    blank, or empty    ";\n        int numTokens = StringUtils.tokenize(str).size() + 1;\n        // exercise\n        // assert\n        Assert.assertFalse(StringUtils.hasSufficientTokens(numTokens, str));\n    }\n\n    @Test\n    public void hasSufficientTokens_NullString() {\n        // setup\n        String str = "";\n        int numTokens = StringUtils.tokenize(str).size();\n        // exercise\n        // assert\n        Assert.assertTrue(StringUtils.hasSufficientTokens(numTokens, str));\n    }\n\n    @Test\n    public void hasSufficientTokens_Success() {\n        // setup\n        String str = "    I\'m not     null,    blank, or empty    ";\n        int numTokens = StringUtils.tokenize(str).size();\n        // exercise\n        // assert\n        Assert.assertTrue(StringUtils.hasSufficientTokens(numTokens, str));\n    }\n}\n\n\nIt\'s not a good idea to use exceptions for program logic.\n\nStringTokenizer is a JDK 1.0 vintage class.  It\'s stood the test of time, but I would not recommend going all the way back to 1995.  \n    ',
    id: 238,
    PostTypeId: 2,
    PostId: 237,
    bounty: 0.04750578231431857,
    UserId: 10,
    upvoteCount: 40
  },
  {
    body:
      "\nI think I found the answer to my own question! I was messing around and thanks to you informing me about the countTokens() function I came up with this!\n\npublic boolean isEnoughTokens(int tokens, String problem) {\n        try {\n            StringTokenizer token = new StringTokenizer(problem);\n            if (token.countTokens() == tokens) {\n                return true;\n            }\n            else {\n                return false;\n            }\n        } catch (NoSuchElementException e) {\n            return false;\n        }\n    }\n\n\nI don't know if there is any error but so far when I tested it, it works!\n    ",
    id: 239,
    PostTypeId: 2,
    PostId: 237,
    bounty: 0.04750578231431857,
    UserId: 87,
    upvoteCount: 27
  },
  {
    body:
      "\n\nI had working ascx code, but today when I viewed ascx file content is showed in binary. Can someone tell me what happened? And how can I get back my ascx file. Of course, I can get from source control but I want to know what is solution of current problem.\nHere is what looks like my code. It is small part of file of course.\n\n    ",
    title: "User control (ASCX) turned into Binary code",
    id: 240,
    PostTypeId: 1,
    bounty: 0.9934829988701634,
    UserId: 29,
    viewCount: 10,
    upvoteCount: 33,
    comments: 0
  },
  {
    body:
      "\n\nWhen I send a push notification with the message being \n\nيامن الرفاعي did X\n\n\nIt shows up on the device as\n\ndid X يامن الرفاعي\n\n\nBut if I were to send\n\nhey يامن الرفاعي did X\n\n\nIt will show up as the original message\n\nAny idea of how to avoid that?\n    ",
    title:
      "iOS - handle arabic / right to left languages in push notifications",
    id: 241,
    PostTypeId: 1,
    bounty: 0.7480334692563619,
    UserId: 75,
    viewCount: 9,
    upvoteCount: 9,
    comments: 1
  },
  {
    body:
      "\nthey go with the language that you used for the first word , that's why when you started by hey , they recognized that you are using a left to right language , but when you start by Arabic , it will start from the right to left \n    ",
    id: 242,
    PostTypeId: 2,
    PostId: 241,
    bounty: 0.7480334692563619,
    UserId: 70,
    upvoteCount: 9
  },
  {
    body:
      "\n\nI'm working on a project, and I want my link to be like /cars/add (Routing) for example,\nand I wrote a function that got the link and processed it to be as above and wrote it to htaccess. So far everything goes well, but the weird thing is the htaccess is not working unless I add a space or new line.\n\nHere is my test:\n\nfunction getLink() {\n  $link =  $_SERVER['REQUEST_URI'];\n  $base = dirname($link);\n\n  $flink = str_replace($base,'',$link);\n  $flink = str_replace('/','',$flink);\n  $tor = $flink;\n  $flink = str_replace('.php?action=','/',$flink);\n\n  if (strpos($link,'.php')) {\n\n    whtaccess($tor,$flink);\n  }\n}\n\nfunction whtaccess($link,$rlink) {\n  $filename = \".htaccess\";\n  $f = fopen($filename,'a+');\n  $string = sprintf(\"\\rRewriteRule %s %s\",$rlink,$link);\n\n  $htacess = file_get_contents($filename);\n  if (strpos($htacess,$string)==true) {\n    fclose($f);\n    header(\"Location:\".$rlink);\n  } else {\n    fwrite($f,$string);\n    fclose($f);\n\n    header(\"Location:\".$rlink);\n  }\n}\n\n\nDo you know what can help me?\n    ",
    title: "PHP and htaccess weird issue",
    id: 243,
    PostTypeId: 1,
    bounty: 0.6085212325767915,
    UserId: 76,
    viewCount: 9,
    upvoteCount: 35,
    comments: 0
  },
  {
    body:
      "\n\nI am using Uri.EncodeDataString to send a query string on a URL.  The original string is: Photo($select=Name,Id)\nIn my asp.net web service running in the VS2015 debugger, Uri.EncodeDataString will return: Photo(%24select%3DName%2CId)\nHowever, in an NUnit test running under the Resharper test runner in VS2015, it returns: Photo%28%24select%3DName%2CId%29. Notice the difference in the encoding of the parentheses.\n\nWhy are the parentheses encoded in the unit test but not in the web service? Shouldn't the parentheses be encoded in the web service? I'm running under .Net 4.6, so I shouldn't be affected by the RFC 3986 issue discusssed elsewhere on StackOverflow (here, here, here and a plethora of other places around the net).\n    ",
    title:
      "Uri.EscapeDataString behaves different in NUnit test vs. asp.net webservice?",
    id: 244,
    PostTypeId: 1,
    bounty: 0.17650430624113467,
    UserId: 4,
    viewCount: 8,
    upvoteCount: 14,
    comments: 1
  },
  {
    body:
      '\nIn the end, I was indeed affected by the RFC 3986 issue.\n\nIt turns out the difference is a "quirks" mode of .Net 4.5.  When running in an asp.net application, unless explicitly set, .Net will attempt to maintain application compatibility with previous versions.\n\nI stepped into framework code and found a quirk setting in UriParser. Googling led me to this article about the <httpruntime> element in web.config. Near the end, it says: \n\n\n  "If there is no <httpRuntime targetFramework> attribute present in\n  Web.config, we assume that the application wanted 4.0 quirks\n  behavior."\n\n\nOnce I added targetFramework="4.5" to my web.config, Uri.EscapeDataString behaved as I expected.\n    ',
    id: 245,
    PostTypeId: 2,
    PostId: 244,
    bounty: 0.17650430624113467,
    UserId: 89,
    upvoteCount: 27
  },
  {
    body:
      '\n\nI am working on a project that sends a ajax post request to a php file and then sets a php variable and returns the variable in js. That all works fine. What I am struggling with is being able call $name in the index.php file once getPhpVar() function has run.\n\nThis is what the program is supposed to do:\n1.run getPhpVar() function\n2.sends ajax post to get.php\n3. get.php set name variable\n4. get.php sends name variable back through js\n5. I am able to call name variable in php\nCode:\nindex.php\n\n<script type = "text/javascript" src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>     \n<script>\nfunction getPhpVar(varname) {\n        $.post("get.php",\n        {\n          name: varname,\n        },\n        function(data,status){\n\n            alert("Data: " + data + "\\nStatus: " + status);\n        });\n}\ngetPhpVar(11);\n</script>\n<?php echo $name;\n?>\n\n\nget.php:\n\n<?php\nif( $_REQUEST["name"] ) {\n   $name = $_REQUEST[\'name\'];\n   echo $name;\n}\n\n?>\n\n    ',
    title: "ajax post return php variable in php",
    id: 246,
    PostTypeId: 1,
    bounty: 0.06776327808192728,
    UserId: 21,
    viewCount: 9,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      '\nYou can\'t do that by echo, you need to do that by javascript like this:\n\n<script>\n    function getPhpVar(varname) {\n        $.post("get.php",\n        {\n          name: varname,\n        },\n        function(data,status){\n            document.getElementById("result").innerHTML = data;\n            alert("Data: " + data + "\\nStatus: " + status);\n\n        });\n}\ngetPhpVar(11);\n</script>\n\n\nAnd your html file would be like :\n\n<div id="result"></div>\n\n\nIn fact your $name variable is in server side but you want to use it in client side, to use it you need to put it in some var or use use equivalence of echo in javascript which is document.getElementById("result").innerHTML or document.write, Another way is to use $_SESSION variables in php and echo.\n    ',
    id: 247,
    PostTypeId: 2,
    PostId: 246,
    bounty: 0.06776327808192728,
    UserId: 20,
    upvoteCount: 3
  },
  {
    body:
      '\n\nI\'m attempting to make a playlist scrollable, but have not had any success. I appreciate any direction. I\'m dynamically reading .mp3 files from a file, and displaying the mp3 names inside a div. If I add more than 6 files the div area increases so the mp3 names are displayed, but it extends beyond/over the controls. I want to make the list scrollable after 6 names, if possible. Here is my code:\n\nHTML:\n\n...\n<!-- Create out audio controls -->\n<audio id="audio" preload="auto" controls="controls" type="audio/mpeg" ontimeupdate="displayTime(this)">\n<source src="data/song1.mp3">song1.mp3" type="audio/mpeg" > \nUnsupported audio format!\n</audio>\n\n<!--Audio in our Playlist-->\n<div id="Playlist">\n<ul class="playlist">\n<?php $files = scandir( "data/" ); ?>\n<?php foreach ( $files as $file )\nif ( $file != \'.\' && $file != \'..\' )\n     echo "<li audiourl=\\"data/$file\\"></li>"; ?>\n\n</ul>\n</div>\n...\n\n\nCSS:\n\n...\n\n.playlist\n{   \nposition: relative;\nbackground:#666;\ntop: 295px;\nleft: 730px;\nwidth:500px;\npadding:15px;\n\n}\n\n\n#Playlist ul.playlist \n{\nposition: relative;\noverflow: auto;\n\n}\n...\n\n\nJS:\n\n...\nvar playList = document.getElementsByClassName(\'Playlist\');\nplayList.scrollTop = 400;\n...\n\n    ',
    title: "How can I scroll through a playlist for audio",
    id: 248,
    PostTypeId: 1,
    bounty: 0.30808871604207355,
    UserId: 13,
    viewCount: 7,
    upvoteCount: 9,
    comments: 1
  },
  {
    body:
      "\nMy answer is more PHP based, but:\n\n<div class=\"carousel-inner\">\n    <?php \n        $chunky = array_chunk ( $files , 6);\n        foreach ($chunky as $array) {\n            echo '<div class=\"item\"><ul>';\n                foreach ($array as $name){\n                    echo '<li>' . $name . '</li>';\n                }\n            echo '</ul></div>';\n        }\n    ?>\n</div>\n\n\nCould you use array_chunk($files, 6) to split files into groups of six, and then do something like the above to output them into the markup for the Bootstrap carousel? (https://getbootstrap.com/examples/carousel/).\n\nEDIT: code example here https://eval.in/692526\n    ",
    id: 249,
    PostTypeId: 2,
    PostId: 248,
    bounty: 0.30808871604207355,
    UserId: 18,
    upvoteCount: 38
  },
  {
    body:
      "\n\nI need to run audio. I try to run it without displaying any player. Here is what I did to play it in simple javascript way;\n\nnew Audio('http://www.example.org/calbeni.mp3').play();\n\n\nWorks quite nicely. However, on mobile, it doesn't work (without any errors).\nWhat is the correct way to make it work on mobile?\n    ",
    title: "Running audio works on desktop, but not on mobile",
    id: 250,
    PostTypeId: 1,
    bounty: 0.6606204667365938,
    UserId: 41,
    viewCount: 4,
    upvoteCount: 7,
    comments: 1
  },
  {
    body:
      "\nIt seems like there are issues with running audio files automatically in the browser. \n\nSee this SO post: Can't make HTML5 Audio Tag to work on mobile browsers\n    ",
    id: 251,
    PostTypeId: 2,
    PostId: 250,
    bounty: 0.6606204667365938,
    UserId: 16,
    upvoteCount: 26
  },
  {
    body:
      '\n\nEDIT* This issue is occurring while testing on a android device. This issue does not appear while testing on a emultor.\n\n\n\nI am starting a new activity and I see onPause is called right after onResume is called. If I look at log it goes to Idle after onResume. Therefore causing onPause right after onResume is called.\n\nCaller activity - calling MainActivity on onClick via intent.\n\npublic class TestActivity extends AppCompatActivity implements View.OnClickListener{\n\n    String TAG = "acr";\n    Button testBtn;\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_test);\n        testBtn = (Button) findViewById(R.id.testBtn);\n        testBtn.setOnClickListener(this);\n    }\n\n    @Override\n    protected void onPause() {\n        super.onPause();\n        Log.i(TAG, "on pause called on TestActivity ");\n    }\n\n    @Override\n    protected void onResume() {\n        super.onResume();\n        Log.i(TAG, "on resume called on  TestActivity ");\n    }\n\n    @Override\n    public void onClick(View v) {\n        switch(v.getId()){\n            case R.id.testBtn:\n                Intent mainIntent = new Intent(this, MainActivity.class);\n                TestActivity.this.startActivity(mainIntent);\n                break;\n        }\n    }\n}\n\n\nActivity that has bug\n\npublic class MainActivity extends AppCompatActivity{\n\n    public static final String TAG = "acrx";\n\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_main);\n    }\n\n\n    @Override\n    protected void onPause() {\n        super.onPause();\n        Log.i(TAG, "on pause called on mainactivity");\n    }\n\n    @Override\n    protected void onResume() {\n        super.onResume();\n        Log.i(TAG, "on resume Called on Main activity");\n    }\n\n    @Override\n    protected void onStop() {\n        super.onStop();\n        Log.i(TAG, "on stop Called on Main activity");\n    }\n}\n\n\nLog\n\n12-06 23:24:19.751 22983-22983/com.example.m1alesis.smartcardreader I/acrx: on resume Called on Main activity\n12-06 23:24:19.751 22983-22983/com.example.m1alesis.smartcardreader D/SecWifiDisplayUtil: Metadata value : SecSettings2\n12-06 23:24:19.751 22983-22983/com.example.m1alesis.smartcardreader D/ViewRootImpl: #1 mView = com.android.internal.policy.PhoneWindow$DecorView{5ce8491 I.E...... R.....ID 0,0-0,0}\n12-06 23:24:19.781 22983-23012/com.example.m1alesis.smartcardreader D/mali_winsys: EGLint new_window_surface(egl_winsys_display*, void*, EGLSurface, EGLConfig, egl_winsys_surface**, egl_color_buffer_format*, EGLBoolean) returns 0x3000,  [1440x2560]-format:1\n12-06 23:24:19.811 22983-22983/com.example.m1alesis.smartcardreader W/DisplayListCanvas: DisplayListCanvas is started on unbinded RenderNode (without mOwningView)\n12-06 23:24:19.831 22983-22983/com.example.m1alesis.smartcardreader D/ViewRootImpl: MSG_RESIZED_REPORT: ci=Rect(0, 96 - 0, 0) vi=Rect(0, 96 - 0, 0) or=1\n12-06 23:24:19.871 22983-23012/com.example.m1alesis.smartcardreader D/OpenGLRenderer: endAllActiveAnimators on 0x7f9c17ec00 (RippleDrawable) with handle 0x7f9ccc8b60\n12-06 23:24:19.871 22983-22983/com.example.m1alesis.smartcardreader I/Timeline: Timeline: Activity_idle id: android.os.BinderProxy@fa2f707 time:376798424\n12-06 23:24:20.131 22983-22983/com.example.m1alesis.smartcardreader V/ActivityThread: updateVisibility : ActivityRecord{e78cff6 token=android.os.BinderProxy@a67fd36 {com.example.m1alesis.smartcardreader/com.example.m1alesis.smartcardreader.TestActivity}} show : false\n12-06 23:24:31.561 22983-22983/com.example.m1alesis.smartcardreader I/acrx: on pause called on mainactivity\n12-06 23:24:31.701 22983-22983/com.example.m1alesis.smartcardreader I/acrx: on resume Called on Main activity\n12-06 23:24:31.721 22983-22983/com.example.m1alesis.smartcardreader I/Timeline: Timeline: Activity_idle id: android.os.BinderProxy@fa2f707 time:376810271\n\n    ',
    title: "OnPause is called right after OnResume",
    id: 252,
    PostTypeId: 1,
    bounty: 0.5417616309162456,
    UserId: 4,
    viewCount: 8,
    upvoteCount: 39,
    comments: 2
  },
  {
    body:
      "\nI tried it in my test activity and I did not get your problem. I had only one button on my MainActivity and my TestActivity.\n\nI have found something here: Pausing and Resuming an Activity. \n\nThis is the interesting part:\n\n\n  Note: When the system calls your activity's onPause() method, the system may be signaling that the activity will be paused for a moment and the user may return focus to your activity, or that the app is running in multi-window mode. However, this method call may also be the first indication that the user is leaving your activity. \n\n    ",
    id: 253,
    PostTypeId: 2,
    PostId: 252,
    bounty: 0.5417616309162456,
    UserId: 36,
    upvoteCount: 12
  },
  {
    body:
      "\nI had the same issue and for me it is related to the activity starting up and the screen not being on - I only saw it after I had the screen off (e.g. after touching the power button and then home to resume again).\n\nThis is a behaviour that others have seen also - I found this question and answer has useful references: OnPause and OnStop() called immediately after starting activity\n\nThe key quote that helped me understand the behaviour was:\n\n\n  Keep in mind that onResume is not the best indicator that your activity is visible to the user; a system window such as the keyguard may be in front. Use onWindowFocusChanged(boolean) to know for certain that your activity is visible to the user\n\n    ",
    id: 254,
    PostTypeId: 2,
    PostId: 252,
    bounty: 0.5417616309162456,
    UserId: 1,
    upvoteCount: 7
  },
  {
    body:
      "\n\nCan someone explain the the OAuth2 JWT token generation and verification in .Net Core?\n    ",
    title: "Setup OAuth2 JWT Token for ADFS and .Net Core",
    id: 255,
    PostTypeId: 1,
    bounty: 0.4048612455359011,
    UserId: 88,
    viewCount: 10,
    upvoteCount: 21,
    comments: 2
  },
  {
    body:
      '\nFirst You need to setup ADFS with a client id and redirect URL, then get a JWT token from ADFS server. See this post http://blog.scottlogic.com/2015/03/09/OAUTH2-Authentication-with-ADFS-3.0.html\n\nAfter that, if you are using .Net Core with JWT Bearer Token you need to\nexport ADFS signing certificate using the following powershell commands:\n\n\n$certRefs=Get-AdfsCertificate -CertificateType Token-Signing\n$certBytes=$certRefs[0].Certificate.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)\n[System.IO.File]::WriteAllBytes("c:\\foo.cer", $certBytes)\n\n\nThen in your .Net Core application start up, you need to use package Microsoft.AspNetCore.Authentication.JwtBearer and look at this post http://andrewlock.net/a-look-behind-the-jwt-bearer-authentication-middleware-in-asp-net-core/\n\nCode in start up class:\n\n            var signingKey = new X509SecurityKey(new System.Security.Cryptography.X509Certificates.X509Certificate2("YOUR-PATH/foo.cer"));\n\n        var tokenValidationParameters = new TokenValidationParameters\n        {\n\n            // The signing key must match!\n            ValidateIssuerSigningKey = true,\n            IssuerSigningKey = signingKey,\n\n            // Validate the JWT Issuer (iss) claim\n            ValidateIssuer = true,\n            ValidIssuer = "http://YOUR-ADFS/adfs/services/trust",\n\n            // Validate the JWT Audience (aud) claim\n            ValidateAudience = true,\n            ValidAudience = "https://YOUR-AUDIENCE/",\n\n            // Validate the token expiry\n            ValidateLifetime = true,\n\n            // If you want to allow a certain amount of clock drift, set that here:\n            ClockSkew = TimeSpan.Zero\n        };\n\n        app.UseJwtBearerAuthentication(new JwtBearerOptions\n        {\n            AutomaticAuthenticate = true,\n            AutomaticChallenge = true,\n            TokenValidationParameters = tokenValidationParameters\n        });\n\n\n\n    ',
    id: 256,
    PostTypeId: 2,
    PostId: 255,
    bounty: 0.4048612455359011,
    UserId: 5,
    upvoteCount: 24
  },
  {
    body:
      "\nPlease check this below link helps u but the procedure is same.\n\nhttps://www.codeproject.com/Articles/1080899/How-to-get-Jwt-token-for-Logged-On-User-or-Applica\n\nOAuth2 Authorization Provider 1.0.0 nuget package has method (ValidateToken) to validate given jwt token but it has certificate dependency (provider). \n\nInstall certificate under Local computer trusted root which is your adfs certificate.\n\nNuget package will identity installed cert based on SubjectKeyIdentifier.\n    ",
    id: 257,
    PostTypeId: 2,
    PostId: 255,
    bounty: 0.4048612455359011,
    UserId: 54,
    upvoteCount: 32
  },
  {
    body:
      "\n\nI was just handed a Makefile that has the following:\n\nrpm: clean $(JARFILE)\n    # commands here...\n\n\nAs you might have guessed, the clean target deletes the jar if it exists.  Is this Makefile correct?  Is there a guarantee that the clean target will be run before the JARFILE target?  I'm not asking about style, but correctness. Is there a chance the JARFILE will be built but then just blown away by the clean target?\n\nI'm using gnu make so that's what I'm most interested in; I'm not sure if this is intended to be portable to other flavors of make.\n    ",
    title: "Makefile order of dependencies",
    id: 258,
    PostTypeId: 1,
    bounty: 0.18740077980888037,
    UserId: 70,
    viewCount: 10,
    upvoteCount: 27,
    comments: 1
  },
  {
    body:
      "\nIf you run make without any parallelism enabled (without -j) then your makefile will work properly.  Make does guarantee that prerequisites are built in the order that they're listed in the makefile, if they are run serially.\n\nHowever if you enable -j then both targets will probably be run in parallel and then you could run into trouble.\n    ",
    id: 259,
    PostTypeId: 2,
    PostId: 258,
    bounty: 0.18740077980888037,
    UserId: 87,
    upvoteCount: 11
  },
  {
    body:
      '\n\nI have a bug in a method of VB6 COM object. It is used in my web-application (mix of classic ASP with newer ASP.NET, Visual Studio 2015) in classic ASP page in the form "OBJECT RUNAT=server PROGID=fgcom id=bla VIEWASTEXT>/OBJECT". I have a code for everything, VB6 IDE including, ISS is 7.5 (win 7).\n\nCan I debug into the COM object? How do I do that?\n    ',
    title: "Debug VB6 COM-object used in classic ASP page in VS2015",
    id: 260,
    PostTypeId: 1,
    bounty: 0.886981670559398,
    UserId: 71,
    viewCount: 2,
    upvoteCount: 11,
    comments: 1
  },
  {
    body:
      "\nYou can debug in the VB6 IDE a com component. \n\nIn fact what you do is open the project in the VB6 IDE put a break point on the first executable line in the sub or function that has the error, then start the component in the IDE, then run the app that consumes it to the point of the call to the VB6 component method. At that point the VB6 IDE will flash if minimised and you will see the focus on the break point and you can use the step and watch functions in the IDE.  This assumes that you have the IDE on the same computer as the calling code which is the easiest case. \n\nNotes\n\n\nI recommend that you vary the name of the class temporarily during debugging for time-efficiency because if your component is already in memory already then IT may receive the calls from your calling code. So if your code instantiates MyComponent.SomeClass then change to MyComponent.SomeClassA in VB6 and your calling code for the period of the debugging effort, then reset for final compile after you find the solution. You can flush the in-memory version via reboots and such but it's easier and more definite if you switch the class name.\nTo be absolutely sure your debug version of the component is being called put a break point on the initialisation sub of the component. \n\n\nOnce set up it is a really easy, repeatable and efficient process.\n\nLet me now if you are not familiar with where to change those settings etc.   \n    ",
    id: 261,
    PostTypeId: 2,
    PostId: 260,
    bounty: 0.886981670559398,
    UserId: 25,
    upvoteCount: 38
  },
  {
    body:
      "\n\nI've been searching for hours but I can't find any answer. I hope someone can help me. \nI have a workbook with all the data and macros let's name it \"wbCurrent\", but I use a macro in the PERSONAL.XLSB workbook to save the wbCurrent with another name, let's say 06-12-2016, in other location. Then I close it(the rename one) and reopen the original wbCurrent again. This macro works perfectly when I call it from a button in the sheet. But recently I modify the excel with custom tab and buttons, but when I call the macro from there, the code stop without error when I close the wbCurrent. I try using an ActiveX button and the problem shows again. I put a form control button and it run ok. What could this be? I really want to use my pretty custom tab. This is what the macro do essentially, remember it is located in PERSONAL\n\nSub New()\n' do some changes in wbCurrent\nwbCurrent.Save\noldwb = wbCurrent.SaveAs (different location, diferent name)\n' Do some change\noldwb.Save\n' here is where it stop executing only when call from activeX or custom tab\noldwb.Close\nwbCurrent=nothing\nwbCurrent=Open FileName.....\n'Do some change\nwbCurrent.save\nend Sub\n\n\nThank u in advance\nBarby\nPD the macro is called from wbCurrent via Application.Run \"PERSONAL.XlBS!New\"\n\nupdate \nI made this test to be sure of the problem\nI put a macro in personal.xlsb with 2 lines of code: 1 close the\nworkbook that call the macro, and 2 shows a message. In an empty\nworkbook I call that macro from 3 different places: control form\nbutton in the sheet, activeX button in the sheet and a button in a\ncustom tab created with an editor. You can only see the message when\nyou call the macro from the first choice, in the others the execution\nsimply ends when the original wookbook is closed, despite the personal\nworkbook is open all the time. Ah, you also see the message when you\nexecute it directly from vba editor.\nIt seem to be something related with who has the control or ownership\nof the macro, but i can't find anything in Application object that\nseem to be related to that.\nAny ideas, please!\n    ",
    title:
      "vba, code execution stop when macro is started from custom tab, or activeX button, but not when sheet form button",
    id: 262,
    PostTypeId: 1,
    bounty: 0.13786073961823186,
    UserId: 64,
    viewCount: 10,
    upvoteCount: 34,
    comments: 1
  },
  {
    body:
      "\nThere is no solution to that: if you execute a macro and that macro closes the workbook that started the macro, the lines after closing will not be executed. So, as I was working with several workbooks, the right way to go was to create and Addin, so that way the macro is not called from my workbook, but from the addin, and because the addin is open all the time I could safely close the workbook and the macro will continue. Thanks to Andy Pope with the idea and for the visual ribbon editor.\n    ",
    id: 263,
    PostTypeId: 2,
    PostId: 262,
    bounty: 0.13786073961823186,
    UserId: 44,
    upvoteCount: 2
  },
  {
    body:
      "\n\nI'm writing a parser using flex and bison for a college assignment. At the moment, my goal is to read expressions made up of integers, strings, and their operators. The integers work well - the problem is with the strings. After I run the program, when I type a string into the console, it's supposed to print back the result of the expression - in this case that it's a string type, followed by the value of the string. So if I type \"hello\", I'm supposed to get back \"it:String=\"hello\"\". The problem is that at my LAST reduction in the bison file (where bison uses one of the start variable's rules to reduce to the start variable), the string value somehow gains a newline at the end of it. So the string ends up being \"hello\\n\", and so it:String=\"hello\"\\n is printed to the console. I've confirmed via the parse trace that the string value is correct until the last reduction, and then it gains that newline, and I can't figure out why. I think the problem will be perfectly clear with some code snippets.\n\nHere is the important part of the lex file. The last rule is where I return a STRING token.\n\n%{\n#include <iostream>\n#include <string>\n#include <stdlib.h>\n#include \"y.tab.h\"\nusing namespace std;\nvoid yyerror(char*);\n%}\n\n%%\n\n0                       { yylval.iVal = atoi(yytext);\n                          return INTEGER;\n                        }\n\n[1-9][0-9]*             { yylval.iVal = atoi(yytext);\n                          return INTEGER;\n                        }\n\n[-+()~$^*/;\\n]          return *yytext;\n\"==\"                    return EQ;\n\"!=\"                    return NE;\n\"&&\"                    return AND;\n\"||\"                    return OR;\n\"\\\"\"[^\"\\\"\"]*\"\\\"\"        { yylval.strVal = yytext;\n                          return STRING; }\n\n\nHere is the yacc file. When applying the rule \"program: program strExpr '\\n' \", that's where I print the response to the console. \n\n%token EQ NE AND OR STRFIND\n%token<iVal> INTEGER\n%token<strVal> STRING\n%left OR\n%left AND\n%left EQ NE\n%left '+' '-'\n%left '*' '/'\n%left UNARY\n%right '^'\n\n%{\n    #include <iostream>\n    #include <cmath>\n    #include <string>\n    #define YYDEBUG 1\n    using namespace std;\n    void yyerror(char *);\n    int yylex(void);\n%}\n\n%union {\n    int iVal;\n    char* strVal;\n}\n\n%type<iVal> intExpr\n%type<strVal> strExpr\n\n%printer {fprintf(yyoutput, \"%s\", $$);} strExpr\n\n%%\n\nprogram:\n    program intExpr '\\n'         {cout<<\"it:Int=\"<<$2<<\"\\n\";}\n    | program strExpr '\\n'       {cout<<\"it:String=\"<<$2<<\"\\n\";}\n    | program intExpr ';'\n    | program strExpr ';'\n    | program intExpr ';' '\\n'\n    | program strExpr ';' '|n'\n    | program '\\n'\n    | program ';'\n    | program ';' '\\n'\n    | ;\nexpr:\n    intExpr\n    | strExpr\n\nintExpr:\n    INTEGER\n    | '-' intExpr %prec UNARY          { $$ = $2 * (-1); }\n    | '+' intExpr %prec UNARY          { $$ = $2; }\n    | intExpr '+' intExpr              { $$ = $1 + $3; }\n    | intExpr '*' intExpr              { $$ = $1 * $3; }\n    | intExpr '-' intExpr              { $$ = $1 - $3; }\n    | intExpr '/' intExpr              { if ($3 == 0) {\n                                           yyerror(0);\n                                           return 1;\n                                       } else\n                                           $$ = $1 / $3; }\n    | '(' intExpr ')'                  { $$ = $2; }\n    | intExpr '^' intExpr              { int i;\n                                         int val = 1;\n                                         for (i = 0; i < $3; i++) {\n                                             val = val * $1;\n                                         }\n                                         $$ = val;\n                                       }\n    | intExpr EQ intExpr               { if ($1 == $3)\n                                             $$ = 1;\n                                         else\n                                             $$ = 0;\n                                       }\n    | intExpr NE intExpr               { if ($1 != $3)\n                                             $$ = 1;\n                                         else\n                                             $$ = 0;\n                                       }\n    | intExpr AND intExpr              { if ($1 != 0 && $3 != 0)\n                                             $$ = 1;\n                                         else\n                                             $$ = 0;\n                                       }\n    | intExpr OR intExpr               { if ($1 != 0 || $3 != 0)\n                                             $$ = 1;\n                                         else\n                                             $$ = 0;\n                                       }\n    | ;\n\nstrExpr:\n    STRING                             \n    | '(' strExpr ')'                  { $$ = $2; }\n    | ;\n\n%%\n\nvoid yyerror(char *s) {\n    fprintf(stderr, \"error\\n\");\n}\n\nint main(void) {\n    yydebug = 1;\n    yyparse();\n    return 0;\n}\n\n\nHere's the output of a sample run:\n\n\"hello\"\nit:String=\"hello\"\n\n1+1\nit:Int=2\n3+4\nit:Int=7\n\n\nWhat's with that extra newline after it:String=\"hello\"?\n\nAnd here's the parse trace, which tells me the newline is being added on right before that last reduction, but I'm at a loss as to why?\n\nStarting parse\nEntering state 0\nReducing stack by rule 10 (line 45):\n-> $$ = nterm program ()\nStack now 0\nEntering state 1\nReading a token: \"hello\"\nNext token is token STRING ()\nShifting token STRING ()\nEntering state 4\nReducing stack by rule 25 (line 93):\n   $1 = token STRING ()\n-> $$ = nterm strExpr (\"hello\")\nStack now 0 1\nEntering state 11\nReading a token: Next token is token '\\n' ()\nShifting token '\\n' ()\nEntering state 29\nReducing stack by rule 2 (line 37):\n   $1 = nterm program ()\n   $2 = nterm strExpr (\"hello\"\n)\n   $3 = token '\\n' ()\nit:String=\"hello\"\n\n-> $$ = nterm program ()\nStack now 0\nEntering state 1\nReading a token:\n\n\nI'll sure appreciate your help.\n    ",
    title:
      "Why does my string token gain a newline at its final reduction in my c++ bison program?",
    id: 264,
    PostTypeId: 1,
    bounty: 0.898411312880153,
    UserId: 68,
    viewCount: 10,
    upvoteCount: 31,
    comments: 1
  },
  {
    body:
      "\nyylval.strVal = yytext;\n\n\nyytext is a pointer that points to a static buffer. The buffer content will change each time a token is read. \n\nyylval.strVal = strdup(yytext);\n\n\nThis will get rid of the newline, but of course introduce a memory leak. You need to take care of it.\n    ",
    id: 265,
    PostTypeId: 2,
    PostId: 264,
    bounty: 0.898411312880153,
    UserId: 86,
    upvoteCount: 20
  },
  {
    body:
      "\n\nI am trying to work out how to return the error part of my do / catch statement, as its not in a function I dont have the completion to send it to and it wants to only accept NSFetchedResultsController ?\n\nHere is the code\n\n    fileprivate lazy var fetchedExercisesTodayController: NSFetchedResultsController<UserExercise> = {\n\n    let fetchRequest: NSFetchRequest<UserExercise> = UserExercise.fetchRequest()\n    fetchRequest.predicate = NSPredicate(format: \"usersroutine == %@\", self.routineName)\n\n    do {\n        let appDelegate = UIApplication.shared.delegate as! AppDelegate\n        let context = appDelegate.persistentContainer.viewContext\n        let queryResults = try context.fetch(fetchRequest)\n\n        fetchRequest.sortDescriptors = [NSSortDescriptor(key: \"id\", ascending: true)]\n        let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: self.persistentContainer.viewContext, sectionNameKeyPath: nil, cacheName: nil)\n        fetchedResultsController.delegate = self\n        return fetchedResultsController\n\n    } catch {\n        print(\"Error with request: \\(error)\")\n        return error\n    }\n}()\n\n\nThe error is on the 'return error' line \n\n\n  Cannot convert return expression of type 'Error' to return type 'NSFetchedResultsController'\n\n    ",
    title: "Returning error on a fetch request?",
    id: 266,
    PostTypeId: 1,
    bounty: 0.5881911548248955,
    UserId: 63,
    viewCount: 3,
    upvoteCount: 25,
    comments: 1
  },
  {
    body:
      '\nIf it can\'t fail, you don\'t need the try/catch at all, so just remove it.\n\nfileprivate lazy var fetchedExercisesTodayController: NSFetchedResultsController<UserExercise> = {\n\n    let fetchRequest: NSFetchRequest<UserExercise> = UserExercise.fetchRequest()\n    fetchRequest.predicate = NSPredicate(format: "usersroutine == %@", self.routineName)\n\n    let appDelegate = UIApplication.shared.delegate as! AppDelegate\n    let context = appDelegate.persistentContainer.viewContext\n    let queryResults = context.fetch(fetchRequest)\n\n    fetchRequest.sortDescriptors = [NSSortDescriptor(key: "id", ascending: true)]\n    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: self.persistentContainer.viewContext, sectionNameKeyPath: nil, cacheName: nil)\n    fetchedResultsController.delegate = self\n    return fetchedResultsController\n}() \n\n\nBut, if you want to protect for failures, which may be possible here, you would make fetchedExcercisesTodayController an optional variable.  You have to make it optional because if it is not, you need to return an object of type NSFetchedResultsController<UserExercise> no matter what. An error is not of object type NSFetchedResultsController<UserExercise>. It is of object type Error.   \n\nIf you make it optional, in the catch you could return nil and do one of three things: \n\n\ncall another method that shows/does something if the try fails\nthrow an error that you handle some where outside of this\nhave it print an error message for you\n\n\nThe only problem with doing that, is that if you have already been initializing and using this variable, you will have to start unwrapping that optional  fetchedExercisesTodayController every where that you have used it. Essentially, both of these things will work, you just have to decide what works best for your code base.\n\n//changed to NSFetchedResultsController<UserExercise>?\nfileprivate lazy var fetchedExercisesTodayController: NSFetchedResultsController<UserExercise>? = {\n\n  let fetchRequest: NSFetchRequest<UserExercise> = UserExercise.fetchRequest()\n  fetchRequest.predicate = NSPredicate(format: "usersroutine == %@", self.routineName)\n\n  do {\n    let appDelegate = UIApplication.shared.delegate as! AppDelegate\n    let context = appDelegate.persistentContainer.viewContext\n    let queryResults = try context.fetch(fetchRequest)\n\n    fetchRequest.sortDescriptors = [NSSortDescriptor(key: "id", ascending: true)]\n    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: self.persistentContainer.viewContext, sectionNameKeyPath: nil, cacheName: nil)\n    fetchedResultsController.delegate = self\n    return fetchedResultsController\n\n  } catch {\n    print("Error with request: \\(error)")\n    //handle error in some way here\n    return nil\n  }\n}()\n\n    ',
    id: 267,
    PostTypeId: 2,
    PostId: 266,
    bounty: 0.5881911548248955,
    UserId: 36,
    upvoteCount: 1
  },
  {
    body:
      '\n\nI have implemented google maps, it works fine until I exit the map Activity to go to another Activity and when I return back to the map activity, it then crashes. I think this happens when the location listener tries to get user position while the FIRST map is still loading or the maps are overloading each other, so how can I destroy my first map when I leave my activity under onPause and onDestroy? \n\nNote that my class extends Activity and not Fragment or FragmentActivity and I am not using MapView.\n\npublic class ActivityLocate extends Activity\nprivate GoogleMap map;\n\n...\n\n    private void initilizeMap() {\n\n    lm = (LocationManager)ActivityLocate.this.getSystemService(Context.LOCATION_SERVICE);\n\n    ll = new LocationListener() {\n\n        @Override\n        public void onLocationChanged(Location location) {\n            // TODO Auto-generated method stub\n\n            if (map == null) {\n                map = ((MapFragment) getFragmentManager().findFragmentById(R.id.map)).getMap();\n\n                // check if map is created successfully or not\n                if (map == null) {\n                    Toast.makeText(getApplicationContext(),"Failed to load map", Toast.LENGTH_SHORT).show();\n                }\n            }\n\n            latitude = location.getLatitude();\n            longitude = location.getLongitude();\n\n            latitudeString = String.valueOf(latitude);\n            longitudeString = String.valueOf(longitude);\n\n            map.setMyLocationEnabled(true);\n\n            if (autoCamera.equals("1"))\n            {\n                map.animateCamera( CameraUpdateFactory.zoomTo(4.0f) );                \n                CameraUpdate center= CameraUpdateFactory.newLatLng(new LatLng(latitude, longitude)); // zoom to current location\n                CameraUpdate zoom=CameraUpdateFactory.zoomTo(8);\n                map.moveCamera(center);\n                map.animateCamera(zoom);\n\n                autoCamera = "0";\n            }\n            else\n            {\n                //don\'t position camera again to allow user to self navigate\n            }\n\n            accessWebService_getMarkers();\n\n        }\n\n        @Override\n        public void onStatusChanged(String provider, int status,\n                Bundle extras) {\n            // TODO Auto-generated method stub\n\n        }\n\n        @Override\n        public void onProviderEnabled(String provider) {\n            // TODO Auto-generated method stub\n\n        }\n\n        @Override\n        public void onProviderDisabled(String provider) {\n            // TODO Auto-generated method stub\n\n        }\n\n    };\n\n    //LOCATION CHANGE OPTIONS\n    lm.requestLocationUpdates(LocationManager.GPS_PROVIDER, 60000, 1, ll); //every minute / meter\n\n}\n\n\nLifecycles:\n\n@Override\nprotected void onResume() {\n    super.onResume();\n\n    if (map == null) {\n        try {\n            initilizeMap();\n\n        } catch (Exception e) {\n            e.printStackTrace();\n        }\n    }   \n}\n\n@Override\npublic void onPause() {\n    super.onPause();\n\n}\n\n@Override\npublic void onDestroy() {\n    super.onDestroy();\n\n}\n\n\nError:\n\nAttempt to invoke virtual method \'com.google.android.gms.maps.GoogleMap com.google.android.gms.maps.MapFragment.getMap()\' on a null object reference\n\n    ',
    title:
      "GoogleMap com.google.android.gms.maps.MapFragment.getMap()&#39; on a null object reference",
    id: 268,
    PostTypeId: 1,
    bounty: 0.08710188139077357,
    UserId: 74,
    viewCount: 2,
    upvoteCount: 21,
    comments: 2
  },
  {
    body:
      "\nGoogle map V2 doesn't use getMap now, it uses getMapAsync(this); \n\nfollow this link Google Map V2 and it will solve your problem\n    ",
    id: 269,
    PostTypeId: 2,
    PostId: 268,
    bounty: 0.08710188139077357,
    UserId: 68,
    upvoteCount: 5
  },
  {
    body:
      "\nSolved, Credit to:\n\nShowing current location in Google Maps using API V2 with SupportMapFragment\n    ",
    id: 270,
    PostTypeId: 2,
    PostId: 268,
    bounty: 0.08710188139077357,
    UserId: 82,
    upvoteCount: 34
  },
  {
    body:
      '\n\nThis program should call a function that opens an external file and browse it counting the rows of it, then it creates a pointer to a matrix and browses again the file but now saving its data on the matrix and returns that matrix, after that it will print the matrix.\n\n#include <stdio.h>\n#include <stdlib.h>\nint tam;\nfloat **carga_archivo(char *nombre_archivo);\nint main()\n{\n    int i,j;\n    char *nombre_archivo="Agua_Vapor.txt";\n    float **agua_vapor=carga_archivo(nombre_archivo);\n    for (i = 0; i < 6; i++)\n    {\n        for (j = 0; i < tam; i++)\n            printf("%f   ", agua_vapor[i][j]);\n        printf("\\n");\n    }\n    return 0;\n}\nfloat **carga_archivo(char *nombre_archivo)\n{\n    int i=0;\n    float P[300][6];\n    FILE *archivo;\n    archivo=fopen(nombre_archivo,"r");\n    while(!feof(archivo))\n    {\n        i++;\n        fscanf(archivo,"%f\\t%f\\t%f\\t%f\\t%f\\t%f\\n",\n                  &P[0][i],&P[1][i],&P[2][i],&P[3][i],&P[4][i],&P[5][i]);\n            //This part is just so the program can read the file line per line,\n            //else it would count character per character, doesn\'t really do anything\n            //(I didn\'t know the command or condition to do it other way\n    }\n    tam=i;\n    printf("%i",tam);\n    int filas = 6;\n    int columnas = tam;\n    float **M = (float **)malloc(filas*sizeof(float*));\n    for (i=0;i<filas;i++)\n        M[i] = (float*)malloc(columnas*sizeof(float));\n    for (i = 0; i < columnas; ++i)\n        fscanf(archivo,"%f\\t%f\\t%f\\t%f\\t%f\\t%f\\n",&M[0][i],&M[1][i],\n                                       &M[2][i],&M[3][i],&M[4][i],&M[5][i]);\n    fclose (archivo);\n    return M;\n}\n\n\nThe problem here is that when the matrix should be printed the program crashes, I know the program does saves the data, since when I print it directly inside the function I does prints, so I think it might be ether the way I\'m declaring the matrix or the function or the way I\'m calling to the function.\n\nEdit: The content of the file it calls is just a data set separated by tabulations.\n\n\n  0.06  36.16   23.739  2425.0  2567.4  8.3304\n  \n  0.06  80.00   27.132  2487.3  2650.1  8.5804  \n  \n  0.06  120.00  30.219  2544.7  2726.0  8.7840\n  \n  0.06  160.00  33.302  2602.7  2802.5  8.9693\n  \n  0.06  200.00  36.383  2661.4  2879.7  9.1398\n  \n  0.06  240.00  39.462  2721.0  2957.8  9.2982\n  \n  0.06  280.00  42.540  2781.5  3036.8  9.4464\n  \n  0.06  320.00  45.618  2843.0  3116.7  9.5859\n  \n  0.06  360.00  48.696  2905.5  3197.7  9.7180\n  \n  0.06  400.00  51.774  2969.0  3279.6  9.8435\n\n\n(you can\'t note the tabulations but they are there)\n\nAny correction is welcome.\n    ',
    title: "Saving and printing a matrix from another file in a function",
    id: 271,
    PostTypeId: 1,
    bounty: 0.9569033296214837,
    UserId: 19,
    viewCount: 8,
    upvoteCount: 38,
    comments: 1
  },
  {
    body:
      '\nfix like this\n\n#include <stdio.h>\n#include <stdlib.h>\n\n#define COLS 6\nint tam;\n\nfloat **carga_archivo(const char *nombre_archivo);\n\nint main(void){\n    int i,j;\n    const char *nombre_archivo= "Agua_Vapor.txt";\n    float **agua_vapor = carga_archivo(nombre_archivo);\n\n    for (i = 0; i < tam; i++){\n        for (j = 0; j < COLS; j++)\n            printf("%f   ", agua_vapor[i][j]);\n        printf("\\n");\n    }\n    //deallocate agua_vapor\n    return 0;\n}\n\nfloat **carga_archivo(const char *nombre_archivo){\n    float P[300][COLS];\n    FILE *archivo = fopen(nombre_archivo, "r");\n    int i= 0;\n\n    while(i < 300 && COLS==fscanf(archivo, "%f\\t%f\\t%f\\t%f\\t%f\\t%f\\n", &P[i][0],&P[i][1],&P[i][2],&P[i][3],&P[i][4],&P[i][5])){\n        i++;\n    }\n    fclose(archivo);\n    tam=i;\n    //printf("%i",tam);\n    int rows = tam, columnas = COLS;\n    float **M = malloc(rows * sizeof(float*));\n    for (i = 0; i < rows; i++){\n        M[i] = malloc(columnas*sizeof(float));\n        for(int j = 0; j < columnas; ++ j)\n            M[i][j] = P[i][j];\n    }\n    return M;\n}\n\n    ',
    id: 272,
    PostTypeId: 2,
    PostId: 271,
    bounty: 0.9569033296214837,
    UserId: 44,
    upvoteCount: 11
  },
  {
    body:
      "\n\nMouse click events include click coordinates that are relative to the QWidget window in which the click occurred.\n\nAssuming that the widget is displaying an image (i.e. the QWidget contains a QLabel whose QPixmap was built from a QImage), how can the mouse click position be converted into the QImage coordinates?\n    ",
    title: "Reliable QWidget to QImage coordinate transformation?",
    id: 273,
    PostTypeId: 1,
    bounty: 0.7931191905079271,
    UserId: 62,
    viewCount: 9,
    upvoteCount: 18,
    comments: 1
  },
  {
    body:
      "\nLooks like the most convenient solution is to process mouse clicks at the QLabel level instead of the QWidget in which it is included. In this case no conversion is needed.\n    ",
    id: 274,
    PostTypeId: 2,
    PostId: 273,
    bounty: 0.7931191905079271,
    UserId: 62,
    upvoteCount: 30
  },
  {
    body:
      "\n\nI am in the process of taking over a set of data pipelines on AWS.  They are all built using the AWS graphical editor tool.  The pipelines are getting complex and my goal is move them to code and have them versioned.  We are a ruby shop so besides of the AWS ruby gem is there another tool or framework I should use to do this?  Any resources, blogs, docs I can follow that would be helpful and easy to follow (aws docs could be better).\n    ",
    title: "AWS Datapipeline to Ruby Code",
    id: 275,
    PostTypeId: 1,
    bounty: 0.6973159176954815,
    UserId: 94,
    viewCount: 6,
    upvoteCount: 3,
    comments: 1
  },
  {
    body:
      "\nDatapipeline supports a JSON definition format. The format is described in these links:\n\n\nPipeline Definition File Syntax\nPipeline Object Reference\n\n\nFrom the Architect, you can export your existing pipelines as JSON by following the instructions here.  \n\nCommit these JSON files to your source control, and run/migrate/deploy them using the AWS CLI like this:\n\naws datapipeline create-pipeline --name mydpl --unique-id mydpl\naws datapipeline put-pipeline-definition --pipeline-id df-xxxxxxxxxx --pipeline-definition file:///mydpl.json\naws datapipeline activate-pipeline --pipeline-id df-xxxxxxxxxx\n\n    ",
    id: 276,
    PostTypeId: 2,
    PostId: 275,
    bounty: 0.6973159176954815,
    UserId: 69,
    upvoteCount: 16
  },
  {
    body:
      '\n\nFor an Ionic app project, I created a json file that stores some event data. This file will later be downloaded within the application and stored locally on the device/ but might be updated to provide new data.\n\nI displayed the data on the artist page with a ng-repeat directive. The problem I am facing is the following: Everytime when the user clicks the plus button on one of the elements, the element is supposed to be displayed on another page (kind of favorite page). What can be a solution to this problem?\n\nHTML\n\n  <ion-item\n          ng-repeat=\'item in artists | filter: query\' class="artist-box">\n              <div class ="info-box-purple" >\n                  <div class = "info-box-text">\n                      <span>{{item.day | Saturday}}<br>{{item.time}}<br>{{item.stage}}</span>\n                  </div>\n              </div>\n              <a href="#/app/artists/{{item.shortname}}">\n                  <h3 class="artist-title"><span>{{item.name}}</span></h3>\n                  <div class="item image item-image">\n                      <img ng-src="img/artists/{{item.shortname}}.jpg" alt="{{item.name}} Photo"/>\n                  </div>\n              </a>\n              <div><button class="add-button button button-royal ion-plus"></button></div>\n\n          </ion-item>\n\n\nController (link between html and controller on separate page)\n\n   .controller(\'ListController\', [\'$scope\', \'$http\', \'$state\', function($scope, $http, $state){\n        $http.get(\'js/data.json\').success(function(data) {\n            $scope.artists = data;\n            $scope.pickedartist = $state.params.bandId;\n        });\n    }\n\n])\n\n\nFormat of JSON file\n\n[\n    {\n        "festival" : "festival 1",\n        "day" : "Friday",\n        "time" : "17:00",\n        "stage" : "Stage 1",\n        "name" : "Balkan Beat Box",\n        "shortname" : "Balkan_Beat_Box",\n        "bio" : "Balkan Beat Box (BBB) is an Israeli musical group founded by Tamir Muskat, Ori Kaplan and now including Tomer Yosef as a core member. The group plays Mediterranean-influenced music that incorporates Jewish, Eastern Europe (mainly Balkan) and Middle Eastern traditions, Gypsy punk, reggae and electronica. As a musical unit they often collaborate with a host of other musicians both in the studio as well as live.",\n        "facebook" : "https://www.facebook.com/balkanbeatbox",\n        "schedule" : "+"\n\n    },{\n        "festival" : "festival 1",\n        "day" : "Friday",\n        "time" : "18:00",\n        "stage" : "Stage 2",\n        "name" : "Blick Bassy",\n        "shortname" : "Blick_Bassy",\n        "bio" : "Born in 1974, singer, songwriter, guitarist and percussionist Blick Bassy grew up with 20 siblings in Cameroon’s capital Yaoundé, a city where people from all parts of the country come together, and the first languages are French and English. Bassy says: “People in Yaoundé lose their traditions and culture rapidly because they don’t speak in their mother tongues with each other or their children. My family is part of the Bassa ethnic group, a nomad tribe that originally comes from Egypt and has descendents down in South Africa. But nowadays people stay in one place because they need visas to cross borders. The word ‘bassa’ means ‘people from the earth’.”",\n        "schedule" : "+"\n    },{\n        "festival" : "festival 1",\n        "day" : "Friday",\n        "time" : "19:00",\n        "stage" : "Stage 3",\n        "name" : "Clueso",\n        "shortname" : "Clueso",\n        "bio" : "Thomas Hübner (born April 9, 1980), better known by his stage name Clueso (pronounced [klyˈzo]), is a German singer, rapper, songwriter and producer. Born in Erfurt, he started performing at the age of 15. His first album Text und Ton was released in 2001. In 2011, Clueso released his album An und für sich, which reached number 2 on the German Top 100. In 2016, he released his latest album Neuanfang, peaking at number 1 on the German Top 100. His music is notable for being a mix of hip hop, pop and electronic music, and sometimes reggae.",\n        "schedule" : "-"\n    }]\n\n    ',
    title: "Ionic Framework: clicking a button to add elements to another page",
    id: 277,
    PostTypeId: 1,
    bounty: 0.852941522435614,
    UserId: 30,
    viewCount: 9,
    upvoteCount: 15,
    comments: 0
  },
  {
    body:
      "\n\nI have a master user in my database that should be able to view all the users in the system.\n\nHere is my code that return all the users in the collection.\n\nTemplate.listEmployees.helpers({\n    employees: function () {\n            return Meteor.users.find({}, { sort: {createdAt: -1}});\n        }\n    });\n\n\nIs it possible to return all the users except for the current logged in user?\n    ",
    title:
      "How to return all the users inside Meteor.users except for the current logged in user?",
    id: 278,
    PostTypeId: 1,
    bounty: 0.3409192376557384,
    UserId: 61,
    viewCount: 1,
    upvoteCount: 15,
    comments: 1
  },
  {
    body:
      "\nJust exclude their _id:\n\nTemplate.listEmployees.helpers({\n  employees() {\n    return Meteor.users.find({ _id: { $ne: Meteor.userId() }}, { sort: { createdAt: -1 }});\n  }\n});\n\n    ",
    id: 279,
    PostTypeId: 2,
    PostId: 278,
    bounty: 0.3409192376557384,
    UserId: 33,
    upvoteCount: 26
  },
  {
    body:
      "\n\nThe current documentation for theme element axis.text says:\n\n\n  axis.text \n  \n  tick labels along axes (element_text; inherits from text)\n\n\nbut it seems like the inheritance isn't working.\n\nThis code gives the plot below, with axis text in grey.\n\nlibrary(ggplot2)\nggplot(data.frame(x=1:10, y=1:10), aes(x, y)) +\n  geom_point(color='red') +\n  theme(rect = element_rect(fill = 'black'),\n        line = element_line(color = 'white'),\n        text = element_text(color = 'blue'),\n        panel.background = element_blank())\n\n\n\n\nSetting axis.text explicitly works, but I was expecting code snippet 1 to already produce this result\n\nggplot(data.frame(x=1:10, y=1:10), aes(x, y)) +\n  geom_point(color='red') +\n  theme(rect = element_rect(fill = 'black'),\n        line = element_line(color = 'white'),\n        text = element_text(color = 'blue'),\n\n        # *** setting this explictly ***\n        axis.text = element_text(color = 'blue'),\n\n        panel.background = element_blank())\n\n\n\n\nI'm starting from a fresh R session, with this sessionInfo()\n\nR version 3.3.1 (2016-06-21)\nPlatform: x86_64-apple-darwin13.4.0 (64-bit)\nRunning under: OS X 10.11.6 (El Capitan)\n\nlocale:\n[1] en_US.UTF-8/en_US.UTF-8/en_US.UTF-8/C/en_US.UTF-8/en_US.UTF-8\n\nattached base packages:\n[1] stats     graphics  grDevices utils     datasets  methods   base     \n\nother attached packages:\n[1] ggplot2_2.2.0\n\nloaded via a namespace (and not attached):\n [1] labeling_0.3     colorspace_1.2-6 scales_0.4.1     assertthat_0.1   lazyeval_0.2.0  \n [6] plyr_1.8.4       tools_3.3.1      gtable_0.2.0     tibble_1.1       Rcpp_0.12.6     \n[11] grid_3.3.1       munsell_0.4.3   \n\n\nHow can I specify high-level theme elements and let those settings cascade down via inheritance? Do I need to somehow 'clear' the default theme? \n    ",
    title: "ggplot2 theme: axis.text not inheriting from text?",
    id: 280,
    PostTypeId: 1,
    bounty: 0.8442659934459402,
    UserId: 34,
    viewCount: 9,
    upvoteCount: 29,
    comments: 1
  },
  {
    body:
      "\nThe difference is that your call to theme() in the first example results in an \"incomplete\" theme object.  \n\nConsider:\n\nattr(theme(rect = element_rect(fill = 'black'),\n           line = element_line(colour = 'white'),\n           text = element_text(colour = 'blue'),\n           panel.background = element_blank()), \"complete\")\n\n\nThis should return FALSE.  My understanding is that a call to theme() when the theme is incomplete does not have all of the inheritance.  A theme like theme_grey() is complete and so inheritance works.  I'm not 100% positive however, but this line in the documentation seems to suggest it.\n\n\n  The object returned by a call to a complete theme function is now a\n  nested list of theme elements and their properties, which enables the\n  new theming system to support inheritance of properties.\n\n\nLook at this page, specifically the section called \"Complete and incomplete theme objects\".  It discusses the same issues with color there, and shows you how to create your own [complete] custom theme where inheritance works.\n    ",
    id: 281,
    PostTypeId: 2,
    PostId: 280,
    bounty: 0.8442659934459402,
    UserId: 66,
    upvoteCount: 18
  },
  {
    body:
      "\n\nI have a lot of functions that fires when window scroll I want to handle it to improve the performance and because sometimes I get this error maximum call stack excess \n    ",
    title:
      "How to handle group of function to prevent it from fire in same time",
    id: 282,
    PostTypeId: 1,
    bounty: 0.9425390623401744,
    UserId: 49,
    viewCount: 9,
    upvoteCount: 21,
    comments: 0
  },
  {
    body:
      '\n\nI\'m trying to make a web-based like slide show and am trying to figure out the best way to transition between slides. I initially used jQuery Animate(), but found it to be not smooth at all. I came across the GreenSock TweenLite/TweenMax library and have seen improvement. \nUnfortunately, things still aren\'t the smoothest. \nThis is what I have thus far:\n\nhttp://codepen.io/FluidOfInsanity/pen/PbJbWm\n\n\nIt runs pretty good in Firefox, but struggles in Chrome quite a bit. It also seems like the bigger the window is, the more jumpy it gets.\nIs there something in my code that\'s causing it to not have smooth transitions? Or am I missing something with the TweenMax implimentation? \nYour help is very appreciated.\n\nUpdate/Answer\n\nInitially my code read as follows:\n\n/* BEFORE UPDATE */\nTweenMax.to($(\'.slide-holder\'), speed, { \n            left: "-=" + xTo, \n            top: "-=" + yTo,\n            overwrite: "all"\n          });\n\n\nTahirAhmed suggested changing it from left and top to x and y. Now my code looks like this and is much smoother:\n\n/* AFTER UPDATE */\nTweenMax.to($(\'.slide-holder\'), speed, { \n            x: "-=" + xTo, \n            y: "-=" + yTo,\n            overwrite: "all"\n          });\n\n    ',
    title: "TweenMax.to() is jumpy/not smooth",
    id: 283,
    PostTypeId: 1,
    bounty: 0.4533675970921389,
    UserId: 75,
    viewCount: 8,
    upvoteCount: 21,
    comments: 2
  },
  {
    body:
      "\nWhen animating, it is recommended to use x and y instead of left and top.\n\nReferences:\n\n\nWhy Moving Elements With Translate() Is Better Than Pos:abs Top/left: Link.\nHigh Performance Animations: Link.\nCSS Triggers: Link.\n\n    ",
    id: 284,
    PostTypeId: 2,
    PostId: 283,
    bounty: 0.4533675970921389,
    UserId: 55,
    upvoteCount: 29
  },
  {
    body:
      "\nTahir's answer pretty much covered it but also try adding these codes to your tween:\n\nease: Power2.easeInOut,\nforce3D: false,\n\n\nand as I've seen on almost every article about tweenmax its better practice to use .fromTo()\n\nIt is also important that you don't set css transitions to the elements you want to animate, you can just add a .set({transition: \" ... \"}) to those elements at the end of your tweens\n    ",
    id: 285,
    PostTypeId: 2,
    PostId: 283,
    bounty: 0.4533675970921389,
    UserId: 44,
    upvoteCount: 19
  },
  {
    body:
      "\n\nI have a shopping cart, and it once an item is added a trash icon appears. There is a current script that works but it targets all of the 'onclick' functions in the page. I would just like it to target this one (garbage can one). Here is the code for the icon.\n\n<td class=\"total\">\n  <span class=\"close\" style=\"color:#f00;\">\n    <i class=\"fa fa-trash\"></i>\n  </span>\n</td>\n\n\nNow the current JavaScript is like this: \n\n$( document ).ready(function() {\n\n$('body').on('click','.close', function(){\nvar here = $(this);\nvar rowid = here.closest('tr').data('rowid');\n\n\nTheres more JavaScript although I'm just showing the beginning.\n\nI tried something like this, but nothing worked.\n\n$( document ).ready(function() {\n  var trash = document.getElementsByClassName(\"fa fa-trash\");\n  trash.on('click', '.close', function(){\n  var here = $(this);\n\n\nI don't know if I am on the right track. \n    ",
    title: "Calling a certain class/ID",
    id: 286,
    PostTypeId: 1,
    bounty: 0.5497371560321942,
    UserId: 43,
    viewCount: 7,
    upvoteCount: 32,
    comments: 2
  },
  {
    body:
      "\nIf i understand you correctly, you just want to bind the click event to the trash icons?\n\nIf so..\n\n$( document ).ready(function() {\n   $('body').on('click','.fa.fa-trash', function(){\n   var here = $(this);  //This variable now equals the clicked trash element.\n   var rowid = here.closest('tr').data('rowid');\n\n\nFurthermore, it's best practice to use a $ sign on the front of the variable when it contains a jQuery element.  That way you and anyone else reading the code can distinguish between the elements and know which variables can have jQuery methods executed upon.\n\nvar $here = $(this);\n\n    ",
    id: 287,
    PostTypeId: 2,
    PostId: 286,
    bounty: 0.5497371560321942,
    UserId: 91,
    upvoteCount: 12
  },
  {
    body:
      '\nReplace \n\nvar trash = document.getElementsByClassName("fa fa-trash");\n\n\nwith \n\nvar trash = $(".fa.fa-trash");\n\n\nIf you want to use JS to fetch the elements, using document.getElementsByClassName then you will have to iterate over a for loop and bind the events specifically for each.\n\n  var trashes = document.getElementsByClassName("fa fa-trash");\n  for(var i=0; i< trashes.length; i++) {\n     var $trash = trashes[i];\n\n     $trash.on(\'click\', \'.close\', function() {\n\n    ...\n  } // end of for loop\n\n\nUse querySelectorAll\n\n var trash = document.querySelectorAll(".fa.fa-trash");\n  trash.on(\'click\', ...\n\n    ',
    id: 288,
    PostTypeId: 2,
    PostId: 286,
    bounty: 0.5497371560321942,
    UserId: 61,
    upvoteCount: 18
  },
  {
    body:
      "\n\npublic class RoomListener implements ActionListener\n{\n    public void actionPerformed(ActionEvent event)\n    {\n        double roomtype; \n\n        if (event.getSource() == room1)\n            roomtype = 60;\n        else if (event.getSource() == room2)\n            roomtype = 75;\n        else \n            roomtype = 100;\n    }\n\n}\n\n\npublic class CostListener implements ActionListener\n{\n    public void actionPerformed(ActionEvent event)\n    {\n        double NightLength, roomNumber, cost;\n        String NightText = NumberOfNights.getText();\n        String RoomText = NumberOfRooms.getText();\n\n        NightLength = Double.parseDouble(NightText);\n        roomNumber = Double.parseDouble(RoomText);\n\n        RoomListener.actionPerformed(RoomType);\n        cost = roomtype * NightLength * roomNumber;\n\n        CostCalculation.setText(Double.toString(cost));\n        NumberFormat fmt = NumberFormat.getNumberInstance();\n        CostCalculation.setText(fmt.format(cost));\n    }\n}\n\n    ",
    title:
      "I am trying to set a value to an already string labeled radio button. I do not understand my mistake",
    id: 289,
    PostTypeId: 1,
    bounty: 0.5546738837502141,
    UserId: 99,
    viewCount: 8,
    upvoteCount: 29,
    comments: 1
  },
  {
    body:
      "\n\n  RoomListener.actionPerformed(RoomType);\n\n\n\nThis isn't a static method. You can't call it using the class name. \nWhat is RoomType? If it isn't an ActionEvent, then it won't work. Look at the method. \n\npublic void actionPerformed(ActionEvent event)\n\nYou really shouldn't be calling out to another listener's actionPerformed, or at least I can't think of a reason to. You need to add a new RoomListener() onto your RadioButtons. Though, I'd suggest you look into a RadioGroup class, and reading the JavaDoc for the correct listener which lets you determine the source of the selected radio button. \nNothing is returned from this method. double roomtype is a local variable and it is discarded (garbage collected) when you exit this method. Maybe you meant to modify a member variable? this.roomtype? \nAlong with that point - I can't tell what room1 and room2 are here... They don't seem to be accessible. \n\npublic void actionPerformed(ActionEvent event)\n{\n    double roomtype; \n\n    if (event.getSource() == room1)\n        roomtype = 60;\n    else if (event.getSource() == room2)\n        roomtype = 75;\n    else \n        roomtype = 100;\n}\n\n\n    ",
    id: 290,
    PostTypeId: 2,
    PostId: 289,
    bounty: 0.5546738837502141,
    UserId: 49,
    upvoteCount: 35
  },
  {
    body:
      "\n\nI am confused about the subject of locking in Oracle. As far as my research has lead me, you can use the FOR UPDATE NOWAIT/WAIT to lock rows.\n\nI want to implement my locking this way. Once I issue the FOR UPDATE, the row will then be locked and I can check for mutations. I have a versionNumber column that increments by 1 everytime the table is updated. Can i use this versionNumber to verify the row has or hasn't mutated? something like\n\nif (:new.versionNum != :old.versionNum)\n         raise_application_error(20000, 'Mutated');\n end if;\n\nMy question is where do I go about actually writing the line of code FOR UPDATE? I've made a small GUI to handle changing first names and saving them back to the database. Is this done in a trigger on oracle on that table or on the side of my JDBC client?\n\nAny clarification would be nice! \n\nThanks\n    ",
    title: "Implementing Optimistic Locking in Oracle",
    id: 291,
    PostTypeId: 1,
    bounty: 0.6858914086784043,
    UserId: 34,
    viewCount: 2,
    upvoteCount: 9,
    comments: 1
  },
  {
    body:
      "\nThere are two general approaches to locking.\n\nFirst, you have pessimistic locking.  In this approach, you lock the row (SELECT ... FOR UPDATE) which prevents anyone else from changing the row.  Then you do the UPDATE.  When you commit your change, the lock is released.  There is no need in this case to have a version number/ timestamp column (at least not to support locking) and the code is relatively easy.  \n\nThe downside to pessimistic locking is that you need to hold the lock the entire time a user is sitting on a page potentially editing data.  This is technically really hard if you're building a web-based application since HTTP is a stateless protocol.  The request that initially renders the page would normally get a connection from the connection pool, do the SELECT, and then return the connection to the pool once the page was done.  The subsequent request to update the data would generally happen on a different connection with a different database session so you can't lock the row in the first session and update it in the second.  If you wanted to pessimistically lock the row, you'd need to do a lot of work on the back end to ensure that the one database connection was tied to a particular middle tier session until the user was done editing the data.  This generally has very negative impacts on scalability and introduces all sorts of session management problems-- how do you know, for example, whether I requested a page, locking a row, and then closed my browser without ever logging out or making a change?  How long are you going to leave the record locked in the database?  What happens if some other session is trying to lock the row?  How long are you going to let that session block waiting for a lock if the first person went out to lunch?  Generally, people don't implement pessimistic locking in web-based apps because managing sessions and session state is just too impractical.\n\nThe second option is optimistic locking.  In this approach, you add a version number/ timestamp to the row.  You select this version number/ timestamp when you query the data.  Then you use this in your WHERE clause when you later do the update and check how many rows were actually modified.  If you modify exactly one row, you know the row hasn't changed since you read it.  If you modify 0 rows, you know that the row did change and you can handle the error.\n\nSo, for example, you'd select the data along with the version number\n\nSELECT address_line1, city, state, zip, version\n  FROM addressTable\n WHERE address_id = `<<some key>>`\n\n\nWhen you were ready to do the update, you'd do something like this where you use the version in your UPDATE and throw an error if the row changed\n\nUPDATE addressTable\n   SET address_line1 = `<<new address line 1>>`,\n       city = `<<new city>>`,\n       state = `<<new state>>`,\n       zip = `<<new zip>>`,\n       version = version + 1\n WHERE address_id = `<<some key>>`\n   AND version = `<<version you read initially>>`\n\nIF( SQL%ROWCOUNT = 0 )\nTHEN\n  -- Darn.  The row must have changed since you read it.  Do something to\n  -- alert the user.  Most likely, the application will need to re-query the\n  -- data to see what the address has been changed to and then ask the user\n  -- whether they want to re-apply the changes.\n  RAISE_APPLICATION_ERROR( -20001, 'Oops, the row has changed since you read it.' );\nEND;\n\n\nYour application would then do something useful with the error.  Normally, that would mean doing something like querying the data again, presenting the changes to the user, and asking them whether they still wanted to apply their changes.  If, for example, I read an address and start editing it, go to lunch, my colleague logs in, reads the same address, makes some edits and saves it, then I return and try to save my changes, it would generally make sense to show me something telling me that my colleague already changed the address to something new-- do I want to continue making edits or do I want to abandon them.\n    ",
    id: 292,
    PostTypeId: 2,
    PostId: 291,
    bounty: 0.6858914086784043,
    UserId: 52,
    upvoteCount: 10
  },
  {
    body:
      '\n\nI have a linear gradient with red at the top going to white at the bottom in my footer CSS. I want the gradient to be the width of the display without black margins to the left and right. I have similar code in my header markup for a solid red line that does not have black margins.\n\nCSS\n\nbody { font-family: Arial; background-color: $black; width: 100%; font-size: 18px; margin:0 auto; }\nfooter, header { font-family: Eurostile; padding-top: 15px; margin:0 auto; .row { .row-col-img-padding { [class*="col-"] { padding-left: 0px !important; padding-right: 0px !important; } } } }\nfooter {\n    color: $gray; font-weight: bold; font-style: italic; font-size: 90%; line-height: 100%; a { color: $bluedark; } \n    background: red; \n    background: linear-gradient($red, $white);\n    background: -khtml-linear-gradient($red, $white); \n    background: -moz-linear-gradient($red, $white); \n    background: -ms-linear-gradient($red, $white); \n    background: -o-linear-gradient($red, $white); \n    background: -webkit-linear-gradient($red, $white); \n}\nheader { background-color: $black; p { color: $grayLight; font-weight: bold; font-size: 100%; line-height: 100%; } }\n\n\nCSS for solid line in header where the red line fills up the screen with no margins.\n\n#back-red { background-color: $red; padding-bottom: 15px; }\n\n\nMarkup\n\n<footer class="footer">\n  <div class="row row-col-img-padding">\n    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">\n      <ul class="list-inline">\n        <li><%= link_to image_tag("footer-facebook-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "Facebook"), "https://www.facebook.com/xxxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-twitter-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "Twitter"), "https://twitter.com/xxxxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-linkedin-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "LinkedIn"), "http://www.linkedin.com/company/xxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-linkedin-bernard-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :translation_hash1}"), "http://www.linkedin.com/in/xxxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-linkedin-pam-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :translation_hash2}"), "http://www.linkedin.com/in/xxxxxxx", target: \'_blank\' %></li>\n      </ul>\n    </div>\n  </div>\n  <div class="row row-col-img-padding">\n    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">\n      <%= link_to image_tag("footer-privacypolicy-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :privacy_head1}"), privacy_path %>\n      <div class="footer-links">\n        <%= link_to "#{t :footer_link1}", locale_root_path %>\n        <%= link_to "#{t :footer_link3}", system_path %>\n        <%= link_to "#{t :footer_link4}", manage_path %>\n        <%= link_to "#{t :footer_link6}", clients_path %>\n        <%= link_to "#{t :footer_link2}", about_path %>\n        <%= link_to "#{t :footer_link5}", contact_path %>\n        <%= link_to "#{t :footer_link7}", media_path %><br>\n        <%= link_to "Facebook", "https://www.facebook.com/LightBeCorp", target: \'_blank\' %>\n        <%= link_to "Twitter", "https://twitter.com/lightbecorp", target: \'_blank\' %>\n        <%= link_to "LinkedIn", "http://www.linkedin.com/company/lightbe-corp", target: \'_blank\' %>\n        <%= link_to "#{t :footer_link8} xxxxxxxxxx", "http://www.linkedin.com/in/bernarddreyer", target: \'_blank\' %>\n        <%= link_to "#{t :footer_link8} xxxxxxxxxx", "http://www.linkedin.com/in/pamelacooktulsaok", target: \'_blank\' %><br>\n        <%= link_to "#{t :footer_link9}", privacy_path %>\n        <%= link_to_unless_current "#{t :english}", locale: "en" %>\n        <%= link_to_unless_current "Français", locale: "fr" %>\n      </div>\n      <p class="text-red-pad-top-10"><%= "#{t :footer2}" %> <span class="text-red">Light</span><span class="text-bluedark">Be</span> ©2010-<%= Time.now.strftime("%Y") %> - <%= "#{t :footer3}" %></p>\n    </div>\n  </div>\n</footer>\n\n\nMarkup for header\n\n<header class="header">\n  <div class="row row-col-img-padding" id="pad-bottom-15">\n    <p class="locale-line" align="center"><span class="english-link"><%= link_to_unless_current "#{t :english}", locale: "en" %></span><%= link_to_unless_current "#{t :french}", locale: "fr" %></p>\n    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center" id="header-images">\n      <div class="page-class" align="center">\n        <ul>\n          <li><%= link_to image_tag("menu-home.jpg", class: "img-responsive aspect", alt: "#{t :footer_link1}"), locale_root_path %></li>\n          <li><%= link_to image_tag("menu-manage-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :footer_link4}"), manage_path %></li>\n          <li><%= link_to image_tag("menu-system-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :footer_link3}"), system_path %></li>\n          <li><%= link_to image_tag("menu-media-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :footer_link7}"), media_path %></li>\n          <li><%= link_to image_tag("menu-clients-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :footer_link6}"), clients_path %></li>\n          <li><%= link_to image_tag("menu-about-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :footer_link2}"), about_path %></li>\n          <li><%= link_to image_tag("menu-contact-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :footer_link5}"), contact_path %></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div class="row row-col-img-padding" id="back-red">\n    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">\n      <h1><%= @page_title %></h1>\n      <% if params[:action] == "system" && I18n.locale.to_s == "fr" %>\n      <% else %>\n        <p><%= @page_abstract1 %></p>\n        <p><%= @page_abstract2 %></p>\n        <p><%= @page_abstract3 %></p>\n        <p><%= @page_abstract4 %></p>\n        <p><%= @page_abstract5 %></p>\n      <% end %>\n      <p><%= @page_abstract6 %></p>\n      <% if params[:action] == "system" && I18n.locale.to_s == "fr" %>\n      <% else %>\n        <p><%= @page_abstract7 %></p>\n      <% end %>\n    </div>\n  </div>\n</header>\n\n\nRuby on Rails application.html.erb\n\n  <body>\n    <div class="container-fluid"> \n      <%= render \'layouts/header\' %> <!-- update app/views/layouts/_systemmessage.html.erb when you need to reboot the server -->\n      <%= render \'layouts/systemmessage\' %>\n      <% flash.each do |key, value| %>\n        <%= content_tag(:div, value, class: "alert alert-#{key}") %>\n      <% end %>\n      <%= yield %>\n      <%= render \'layouts/contact_footer\' %>\n      <%= render \'layouts/footer\' %>\n    </div>\n    <%= javascript_include_tag "application" %>\n    <%= debug(params) if Rails.env.development? %>\n  </body>\n\n\nThe images below shows how my CSS works at widths 500px and 320px. The links and the images are using CSS .footer-links. They spread to the edge of the screen but the gradient does not.\n\n\n\n\n\nCSS below\n\n.footer-links { width: 1024px; padding-top: 10px; a { padding-left: 5px; padding-right: 5px; } }\n\n@media screen and (max-width: 1024px) { body, footer, header, .box-message, .footer-links, .page-class, .red-line-1px { max-width: 100%; } }\n\n\nSince the header and footer are within body I assume my problem is with the gradient width. I have seen many posts related to linear gradients and widths but I could not find anything that explained exactly how I need to change my CSS to get this working.\n    ',
    title: "How Do I Modify My Linear Gradient Width to 100%?",
    id: 293,
    PostTypeId: 1,
    bounty: 0.7512581381838528,
    UserId: 10,
    viewCount: 1,
    upvoteCount: 22,
    comments: 3
  },
  {
    body:
      '\nBootstraps .container-fluid rule looks like this\n\n{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}\n\n\nSo for your footer to work, you could do like this, where the major change is to add a wrapper <div class="row"> and then remove the row class from \n<div class="row-col-img-padding">, and then set the gradient on the wrapper\n\nMarkup for footer\n\n  <footer class="footer">\n    <div class="row">\n      <div class="row-col-img-padding">\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">\n          <ul class="list-inline">\n            <li><%= link_to image_tag("footer-facebook-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "Facebook"), "https://www.facebook.com/xxxxxxx", target: \'_blank\' %></li>\n            <li><%= link_to image_tag("footer-twitter-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "Twitter"), "https://twitter.com/xxxxxxxx", target: \'_blank\' %></li>\n            <li><%= link_to image_tag("footer-linkedin-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "LinkedIn"), "http://www.linkedin.com/company/xxxxxx", target: \'_blank\' %></li>\n            <li><%= link_to image_tag("footer-linkedin-bernard-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :translation_hash1}"), "http://www.linkedin.com/in/xxxxxxx", target: \'_blank\' %></li>\n            <li><%= link_to image_tag("footer-linkedin-pam-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :translation_hash2}"), "http://www.linkedin.com/in/xxxxxxx", target: \'_blank\' %></li>\n          </ul>\n        </div>\n      </div>\n      <div class="row-col-img-padding">\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">\n          <%= link_to image_tag("footer-privacypolicy-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :privacy_head1}"), privacy_path %>\n          <div class="footer-links">\n            <%= link_to "#{t :footer_link1}", locale_root_path %>\n            <%= link_to "#{t :footer_link3}", system_path %>\n            <%= link_to "#{t :footer_link4}", manage_path %>\n            <%= link_to "#{t :footer_link6}", clients_path %>\n            <%= link_to "#{t :footer_link2}", about_path %>\n            <%= link_to "#{t :footer_link5}", contact_path %>\n            <%= link_to "#{t :footer_link7}", media_path %><br>\n            <%= link_to "Facebook", "https://www.facebook.com/LightBeCorp", target: \'_blank\' %>\n            <%= link_to "Twitter", "https://twitter.com/lightbecorp", target: \'_blank\' %>\n            <%= link_to "LinkedIn", "http://www.linkedin.com/company/lightbe-corp", target: \'_blank\' %>\n            <%= link_to "#{t :footer_link8} xxxxxxxxxx", "http://www.linkedin.com/in/bernarddreyer", target: \'_blank\' %>\n            <%= link_to "#{t :footer_link8} xxxxxxxxxx", "http://www.linkedin.com/in/pamelacooktulsaok", target: \'_blank\' %><br>\n            <%= link_to "#{t :footer_link9}", privacy_path %>\n            <%= link_to_unless_current "#{t :english}", locale: "en" %>\n            <%= link_to_unless_current "Français", locale: "fr" %>\n          </div>\n          <p class="text-red-pad-top-10"><%= "#{t :footer2}" %> <span class="text-red">Light</span><span class="text-bluedark">Be</span> ©2010-<%= Time.now.strftime("%Y") %> - <%= "#{t :footer3}" %></p>\n        </div>\n      </div>\n    </div>\n  </footer>\n\n\nChange your CSS footer rule to this\n\nfooter {\n    padding-top: 0\n}\n\n\nMove content of existing footer rule to a new rule, footer > .row, like this\n\nfooter > .row {\n    padding-top: 15px;     /*  added new property  */\n\n    color: $gray; font-weight: bold; font-style: italic; font-size: 90%; line-height: 100%; a { color: $bluedark; } \n    background: red; \n    background: linear-gradient($red, $white);\n    background: -khtml-linear-gradient($red, $white); \n    background: -moz-linear-gradient($red, $white); \n    background: -ms-linear-gradient($red, $white); \n    background: -o-linear-gradient($red, $white); \n    background: -webkit-linear-gradient($red, $white); \n}\n\n    ',
    id: 294,
    PostTypeId: 2,
    PostId: 293,
    bounty: 0.7512581381838528,
    UserId: 54,
    upvoteCount: 29
  },
  {
    body:
      "\nYou could try\n\nbackground-size: 100% 100%;\n\n\nYou might not need both 100% on horizontal and vertical, but give it a try.\n\nIt is hard to see without your html, but I hope this helps.\nAnd you might need browser specific css also eg\n\n-o-background-size: 100% 100%;\n-moz-background-size: 100% 100%;\n-webkit-background-size: 100% 100%;\n\n    ",
    id: 295,
    PostTypeId: 2,
    PostId: 293,
    bounty: 0.7512581381838528,
    UserId: 24,
    upvoteCount: 23
  },
  {
    body:
      '\nOkay. Copied your code, removed some css, and as I thought, the footer behaves as the block level element it is. Which means the margins on footer is due to something else than the code you provided, or it is in the code I took out of your css (although it shouldn\'t be). \n\nAnd, if you had mentioned that you were using some sort of framework, and actually posted the CSS, not whatever non-built *CSS you have, this would have been easier. Also, had you made it into a fiddle, you would see that it is 100% wide. So, the problem is either because that footer is wrapped in something else (another div?), or because your example or code is not the actual code. Stop using framework-specific code in examples. At least when you don\'t mention what framework you\'re using.\n\n\n\nbody { font-family: Arial; background-color: black; width: 100%; font-size: 18px; margin:0 auto; }\n\nfooter {\n    color: gray; font-weight: bold; font-style: italic; font-size: 90%; line-height: 100%; \n    background: red; \n    background: linear-gradient(red, white);\n    background: -khtml-linear-gradient(red, white); \n    background: -moz-linear-gradient(red, white); \n    background: -ms-linear-gradient(red, white); \n    background: -o-linear-gradient(red,white); \n    background: -webkit-linear-gradient(red, white); \n}\n\n#back-red { background-color: red; padding-bottom: 15px; }\n<footer class="footer">\n  <div class="row row-col-img-padding">\n    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">\n      <ul class="list-inline">\n        <li><%= link_to image_tag("footer-facebook-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "Facebook"), "https://www.facebook.com/xxxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-twitter-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "Twitter"), "https://twitter.com/xxxxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-linkedin-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "LinkedIn"), "http://www.linkedin.com/company/xxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-linkedin-bernard-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :translation_hash1}"), "http://www.linkedin.com/in/xxxxxxx", target: \'_blank\' %></li>\n        <li><%= link_to image_tag("footer-linkedin-pam-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :translation_hash2}"), "http://www.linkedin.com/in/xxxxxxx", target: \'_blank\' %></li>\n      </ul>\n    </div>\n  </div>\n  <div class="row row-col-img-padding">\n    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">\n      <%= link_to image_tag("footer-privacypolicy-#{I18n.locale}.jpg", class: "img-responsive aspect", alt: "#{t :privacy_head1}"), privacy_path %>\n      <div class="footer-links">\n        <%= link_to "#{t :footer_link1}", locale_root_path %>\n        <%= link_to "#{t :footer_link3}", system_path %>\n        <%= link_to "#{t :footer_link4}", manage_path %>\n        <%= link_to "#{t :footer_link6}", clients_path %>\n        <%= link_to "#{t :footer_link2}", about_path %>\n        <%= link_to "#{t :footer_link5}", contact_path %>\n        <%= link_to "#{t :footer_link7}", media_path %><br>\n        <%= link_to "Facebook", "https://www.facebook.com/LightBeCorp", target: \'_blank\' %>\n        <%= link_to "Twitter", "https://twitter.com/lightbecorp", target: \'_blank\' %>\n        <%= link_to "LinkedIn", "http://www.linkedin.com/company/lightbe-corp", target: \'_blank\' %>\n        <%= link_to "#{t :footer_link8} xxxxxxxxxx", "http://www.linkedin.com/in/bernarddreyer", target: \'_blank\' %>\n        <%= link_to "#{t :footer_link8} xxxxxxxxxx", "http://www.linkedin.com/in/pamelacooktulsaok", target: \'_blank\' %><br>\n        <%= link_to "#{t :footer_link9}", privacy_path %>\n        <%= link_to_unless_current "#{t :english}", locale: "en" %>\n        <%= link_to_unless_current "Français", locale: "fr" %>\n      </div>\n      <p class="text-red-pad-top-10"><%= "#{t :footer2}" %> <span class="text-red">Light</span><span class="text-bluedark">Be</span> ©2010-<%= Time.now.strftime("%Y") %> - <%= "#{t :footer3}" %></p>\n    </div>\n  </div>\n</footer>\n\n\n\n    ',
    id: 296,
    PostTypeId: 2,
    PostId: 293,
    bounty: 0.7512581381838528,
    UserId: 48,
    upvoteCount: 21
  },
  {
    body:
      '\n\nI´m struggling to figure out what is the problem, I receive the following error when trying to do \n\nFXMLLoader loader = new FXMLLoader(getClass().getResource("/leftBar.fxml"));\n    Parent root = loader.load();\n\n\nError message:\n\n Exception in Application start method\n Exception in thread "main" java.lang.RuntimeException: Exception in       Application start method\nat com.sun.javafx.application.LauncherImpl.launchApplication1(LauncherImpl.java:917)\nat com.sun.javafx.application.LauncherImpl.lambda$launchApplication$155(LauncherImpl.java:182)\nat java.lang.Thread.run(Thread.java:745)\nCaused by: javafx.fxml.LoadException: \n/C:/onfocusproject/target/resources/main/leftBar.fxml:11\n\nat javafx.fxml.FXMLLoader.constructLoadException(FXMLLoader.java:2601)\nat javafx.fxml.FXMLLoader.access$700(FXMLLoader.java:103)\nat javafx.fxml.FXMLLoader$ValueElement.processAttribute(FXMLLoader.java:932)\nat javafx.fxml.FXMLLoader$InstanceDeclarationElement.processAttribute(FXMLLoader.java:971)\nat javafx.fxml.FXMLLoader$Element.processStartElement(FXMLLoader.java:220)\nat javafx.fxml.FXMLLoader$ValueElement.processStartElement(FXMLLoader.java:744)\nat javafx.fxml.FXMLLoader.processStartElement(FXMLLoader.java:2707)\nat javafx.fxml.FXMLLoader.loadImpl(FXMLLoader.java:2527)\nat javafx.fxml.FXMLLoader.loadImpl(FXMLLoader.java:2441)\nat javafx.fxml.FXMLLoader.load(FXMLLoader.java:2409)\nat tutorial.Application.initScreen(Application.java:74)\nat tutorial.Application.start(Application.java:57)\nat com.sun.javafx.application.LauncherImpl.lambda$launchApplication1$162(LauncherImpl.java:863)\nat com.sun.javafx.application.PlatformImpl.lambda$runAndWait$175(PlatformImpl.java:326)\nat com.sun.javafx.application.PlatformImpl.lambda$null$173(PlatformImpl.java:295)\nat java.security.AccessController.doPrivileged(Native Method)\nat com.sun.javafx.application.PlatformImpl.lambda$runLater$174(PlatformImpl.java:294)\nat com.sun.glass.ui.InvokeLaterDispatcher$Future.run(InvokeLaterDispatcher.java:95)\nat com.sun.glass.ui.win.WinApplication._runLoop(Native Method)\nat com.sun.glass.ui.win.WinApplication.lambda$null$148(WinApplication.java:191)\n... 1 more\nCaused by: java.lang.InstantiationException: tutorial.controller.impl.ControllerImpl\nat java.lang.Class.newInstance(Class.java:427)\nat sun.reflect.misc.ReflectUtil.newInstance(ReflectUtil.java:51)\nat javafx.fxml.FXMLLoader$ValueElement.processAttribute(FXMLLoader.java:927)\n... 18 more\nCaused by: java.lang.NoSuchMethodException: tutorial.controller.impl.ControllerImpl.<init>()\nat java.lang.Class.getConstructor0(Class.java:3082)\nat java.lang.Class.newInstance(Class.java:412)\n... 20 more\n\n\nThe structure of the project is the following\n\n\n\nMany thanks for your help.\n    ',
    title: "Error when loader.load()",
    id: 297,
    PostTypeId: 1,
    bounty: 0.8955882650847389,
    UserId: 2,
    viewCount: 3,
    upvoteCount: 14,
    comments: 0
  },
  {
    body:
      "\n\nI have domain classes for a Request, a RequestSet (a collection of individual requests submitted by a single user at the same time) and a request Status. I'd like to aggregate the statuses on the requests so that a request set has a status that is determined from the state of its individual requests.\n\nThe relevant parts of these domain classes look like this:\n\nclass RequestSet {\n    Long id\n    static hasMany = [requests: Request]\n}\n\nclass Request {\n    Long id\n    Status status\n}\n\nclass Status {\n    Long id\n    String status\n}\n\n\nI tried adding a derived status property to the RequestSet class like so:\n\nclass RequestSet {\n    Long id\n    Status status\n    static hasMany = [requests: Request]\n\n    static transients = ['status']\n\n    static mapping = {\n        status formula: '(SELECT MIN(status_id) FROM (SELECT status_id FROM request rq WHERE rq.request_set_id = id))'\n    }\n}\n\n\nWhen I run my app and inspect the properties of the requestSet objects, however, the statuses are all null.\n\nIs what I'm trying to accomplish even possible using derived properties? I could settle for a transient property with a getter but I'd like to be able to use dynamic finders to retrieve requestSets based on their bubbled-up statuses. All the examples I've seen use the result of the formula as is; I'd like to know if I can somehow get Grails to interpret the returned value as an ID for the Status class.\n\nEDIT, 7 Dec 2016: Note that I marked the derived status property as transient. Without doing so I get a ClassCastException from Hibernate.\n\norg.springframework.beans.factory.BeanCreationException: Error creating bean with name 'transactionManagerPostProcessor': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'transactionManager': Cannot resolve reference to bean 'transactionManager_companion' while setting constructor argument with key [1]; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'transactionManager_companion': Cannot resolve reference to bean 'sessionFactory_companion' while setting bean property 'sessionFactory'; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'sessionFactory_companion': Invocation of init method failed; nested exception is java.lang.ClassCastException: org.hibernate.mapping.Formula cannot be cast to org.hibernate.mapping.Column\n    at java.util.concurrent.FutureTask.run(FutureTask.java:266)\n    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)\n    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)\n    at java.lang.Thread.run(Thread.java:745)\n\n\nI suspect even if the formula works I wouldn't be able to use dynamic finders with this property because it's marked as transient. I'll settle for using the formula to compute the id of the status but I'm still having issues with that.\n\nNow my domain class looks like this:\n\nclass RequestSet {\n    Long id\n    Long statusId\n    static hasMany = [requests: Request]\n\n    static mapping = {\n        statusId formula: '(SELECT MIN(status_id) FROM (SELECT rq.status_id FROM request rq WHERE rq.request_set_id = id))'\n    }\n}\n\n\nThe SQL generated by the formula when fetching the request sets is\n\n(SELECT MIN(this_.status_id) FROM (SELECT rq.status_id FROM request rq WHERE rq.request_set_id = this_.id)) as formula3_0_ from request_set\n\n\nand I'm getting an SQLSyntaxErrorException: ORA-00904: \"THIS_\".\"STATUS_ID\": invalid identifier. How can I rewrite the formula so that 'this_.' is not prepended to the status_id?\n    ",
    title: "Possible to use Grails derived property to retrieve domain object?",
    id: 298,
    PostTypeId: 1,
    bounty: 0.21050716858337482,
    UserId: 33,
    viewCount: 3,
    upvoteCount: 2,
    comments: 1
  },
  {
    body:
      '\nIn response to my original question, no, you can\'t use a formula to derive a property that is another domain class. My numerous failed attempts to do so have led me to this conclusion and the author of this blog seems to think so too. Specifically, "derived properties can be of any type supported by Hibernate" and my Status class is not.\n\nAs for my follow-up question, the formula I was using is not supported by HQL according to this answer for a different question. I managed to get the statusId as a derived property using this formula instead:\n\n(SELECT MIN(status.id) FROM status WHERE status.id IN (SELECT rq.status_id FROM request rq WHERE rq.request_set_id = id))\n\n\nThanks @Mike for the suggestion to turn on SQL logging. That really helped to figure out what was going on.\n    ',
    id: 299,
    PostTypeId: 2,
    PostId: 298,
    bounty: 0.21050716858337482,
    UserId: 15,
    upvoteCount: 30
  },
  {
    body:
      '\n\nI have a block of HTML markup that looks something like this for a Course. This is predefined by the CMS my client\'s using\n\n<ul class="box-3036">\n  <li aria-selected="true">\n    <a href="#" id="ui-id-5">Dentistry</a>\n  </li>\n</ul>\n\n\nI have a bunch of courses, here\'s another example of this HTML block for another course.\n\n<ul class="box-3032">\n  <li aria-selected="true">\n    <a href="#" id="ui-id-7">Pharmacy</a>\n  </li>\n</ul>\n\n\nI am trying to write a jQuery code for all these courses. From the HTML block, here are the unique info\n\n\nthe <ul> class\nthe <a> id\nand the <a> click will open up two course URLs\n\n\nHere\'s the jQuery code I have now. The problem I am facing is that the URL vars is giving me undefined value\n\nbox = [\n  ".box-3036",\n  ".box-3032"\n];  \n\nuiid = [\n  "a#ui-id-5",\n  "a#ui-id-7"\n];  \n\nurlfirst = [\n  "http://www.yahoo.com",\n  "http://www.gmail.com"\n];\n\nurlsecond = [\n  "http://www.google.com",\n  "http://www.7senarai.com "\n];   \n\n\n\nfor (var i = 0; i < box.length; i++) {\n        $(box[i] + " " + uiid[i]).click(function() {\n\n      var pid = $(this).parent().attr("aria-selected");\n      if(pid == "true") { \n        //window.open(urlfirst[i], \'_blank\');\n        //window.location.href = urlsecond[i];\n        alert(urlfirst[i]);\n        alert(urlsecond[i]);\n\n      }\n    });\n\n}\n\n\nHere\'s my jsfiddle\n    ',
    title: "Array showing undefined in if statement",
    id: 300,
    PostTypeId: 1,
    bounty: 0.6271593540021492,
    UserId: 87,
    viewCount: 10,
    upvoteCount: 39,
    comments: 3
  },
  {
    body:
      '\nThe issue is that the var i in the for loop\'s scope is above the function you pass to click, so you are getting the value of i AFTER the loop is finished which is 2 in this instance. You want the i to be scoped for your click function\n\n for (var i = 0; i < box.length; i++) {\n    (function (i) {\n            $(box[i] + " " + uiid[i]).click(function () {\n          var pid = $(this).parent().attr("aria-selected");\n          if(pid == "true") { \n            //window.open(urlfirst[i], \'_blank\');\n            //window.location.href = urlsecond[i];\n            alert(urlfirst[i]);\n            alert(urlsecond[i]);\n\n          }\n        });\n     })(i); // bring i into scope\n }\n\n    ',
    id: 301,
    PostTypeId: 2,
    PostId: 300,
    bounty: 0.6271593540021492,
    UserId: 17,
    upvoteCount: 17
  },
  {
    body:
      '\nI would suggest you use a forEach rather than a for loop so the i is scoped for each binding.\n\nbox.forEach(function(aBox, i){\n  $(aBox + " " + uiid[i]).click(function() {\n    var pid = $(this).parent().attr("aria-selected");\n    if (pid == "true") {\n      //window.open(urlfirst[i], \'_blank\');\n      //window.location.href = urlsecond[i];\n      console.log(i);\n      console.log(urlfirst[i]);\n      console.log(urlsecond[i]);\n    }\n  });\n});\n\n    ',
    id: 302,
    PostTypeId: 2,
    PostId: 300,
    bounty: 0.6271593540021492,
    UserId: 53,
    upvoteCount: 18
  },
  {
    body:
      '\nUse a closure around the content of the loop to preserve the value of i like so:\n\nfor (var i = 0; i < box.length; i++) {\n     (function( i ) {\n        $(box[i] + " " + uiid[i]).click(function() {\n\n          var pid = $(this).parent().attr("aria-selected");\n          if(pid == "true") { \n            //window.open(urlfirst[i], \'_blank\');\n            //window.location.href = urlsecond[i];\n            alert(urlfirst[i]);\n            alert(urlsecond[i]);\n\n          }\n        });\n    })( i );\n}\n\n\nDEMO\n    ',
    id: 303,
    PostTypeId: 2,
    PostId: 300,
    bounty: 0.6271593540021492,
    UserId: 61,
    upvoteCount: 37
  },
  {
    body:
      "\n\nI have the following tables. \n\nTable 1\n\nId | Data | Values \n1  | rfsd | 23\n2  | fghf | 45\n3  | rhhh | 23\n\n\nTable 3\n\nId | Data | Values \n1  | rfsd | 23\n2  | tfgy | 23\n\n\nTable 2\n\nId | Fields | Counts\n1  | 23     |   0 \n2  | 45     |   0\n\n\nAs you can see, the Counts field is 0. I want to see 'Fields' column in table 2 and compare then with the 'Values' column in table 1 and table 3 and increment the count whenever the value is present in 'Values' field.\n\nThe final result should show like this\n\nTable 2\nId | Fields | Counts\n1  | 23     |   4\n2  | 45     |   1\n\n\nThis will be the counts since 23 appear four times and 45 appear once in the 'Values' field of table 1 and table 3.\n\nCan someone please let me know how to write a stored procedure for this.\n\nI have implemented something like this. \n\n    WITH t1 AS (\n              SELECT VALUES, COUNT(*) AS Count2 FROM Table1 GROUP BY VALUES)\nUPDATE t2\nSET t2.Counts = t1.Count2\nFROM Table2 t2\nJOIN t1 ON t2.Fields=t1.Values;\n\nWITH t3 AS (SELECT VALUES, COUNT(*) AS Count3 FROM Table3 GROUP BY   VALUES)\nUPDATE t2\nSET t2.Counts = t3.Count2\nFROM\nTable2 t2\nJOIN t3 ON t2.Fields=t3.Values;\n\n\nWhen i use this stored procedure, it is updating t2 on basis of t1 table and then overwriting the table t2 by using t3 table. \n\nI want t1 and t3 columns to be updated on t2 table at the same time. Any idea how to correct this stored procedure. \n    ",
    title: "Update table based on values of column in other 2 table",
    id: 304,
    PostTypeId: 1,
    bounty: 0.31198334651865545,
    UserId: 94,
    viewCount: 10,
    upvoteCount: 38,
    comments: 2
  },
  {
    body:
      "\nYou can use UNION ALL to group two tables 1 and 3 together (UNION ALL if you want disjoint union, UNION if you want to remove duplicate)\n\nWITH t13 AS (\n    SELECT Id, Data, [Values]\n    FROM Table1\n    UNION ALL\n    SELECT Id, Data, [Values]\n    FROM Table3   \n), cte AS (\n    SELECT \n        [Values], \n        COUNT(*) AS Count2 \n    FROM t13\n    GROUP BY\n        [Values]\n)\nUPDATE t2\nSET Counts = cte.Count2\nFROM\n    Table2 t2 JOIN cte ON t2.Fields = cte.[Values];\n\n    ",
    id: 305,
    PostTypeId: 2,
    PostId: 304,
    bounty: 0.31198334651865545,
    UserId: 70,
    upvoteCount: 25
  },
  {
    body:
      "\nHope this will help.\n\nSELECT t2.Id, t2.Fields, COUNT(1) Counts\nFROM Table2 t2\n    LEFT JOIN Table1 t1 ON t2.Fields = t1.[Values]\n    LEFT JOIN Table3 t3 ON t2.Fields = t3.[Values]\nGROUP BY t2.Id, t2.Fields\n\n\nIf you need to update the Table2, use the following:-\n\nWITH Results AS (\n    SELECT t2.Id, COUNT(1) Counts\n    FROM Table2 t2\n       LEFT JOIN Table1 t1 ON t2.Fields = t1.[Values]\n       LEFT JOIN Table3 t3 ON t2.Fields = t3.[Values]\n    GROUP BY t2.Id\n)\nUPDATE t\nSET Counts = r.Counts\nFROM Table2 t\n    JOIN Results r ON t.Id = r.Id;\n\n    ",
    id: 306,
    PostTypeId: 2,
    PostId: 304,
    bounty: 0.31198334651865545,
    UserId: 69,
    upvoteCount: 2
  },
  {
    body:
      "\n\nI have this FirebaseRecyclerAdapter:\n\nmAdapter = new FirebaseRecyclerAdapter<Chat, ChatHolder>(\nChat.class, \n// Below layout is where I want the AnkoComponent\nandroid.R.layout.two_line_list_item, \nChatHolder.class, \nmRef) {\n    @Override\n    public void populateViewHolder(ChatHolder chatMessageViewHolder, Chat chatMessage, int position) {\n        chatMessageViewHolder.setName(chatMessage.getName());\n        chatMessageViewHolder.setText(chatMessage.getText());\n    }\n};\nrecycler.setAdapter(mAdapter);\n\n\nI want to use an AnkoComponent that is in a different file than the adapter. If anybody could help me with this I would be so grateful.\n\nJust in case it helps, below is the AnkoComponent that I want to use as my list item in the viewHolder.\n\nclass PriorityUI : AnkoComponent<Priority> {\n    override fun createView(ui: AnkoContext<Priority>) = with(ui) {\n\n        relativeLayout {\n            id = R.id.priority_item_layout\n            linearLayout {\n                orientation = LinearLayout.HORIZONTAL\n\n                textView {\n                    id = R.id.textView_priority\n                    textAlignment = Gravity.CENTER\n                }.lparams {\n                    width = matchParent\n                }\n\n            }.lparams {\n                width = matchParent\n            }\n        }\n    }\n}\n\n    ",
    title: "How do I use AnkoComponent inside FirebaseRecyclerAdapter?",
    id: 307,
    PostTypeId: 1,
    bounty: 0.5331662389118441,
    UserId: 27,
    viewCount: 2,
    upvoteCount: 32,
    comments: 0
  },
  {
    body:
      '\n\nI can\'t figure out how to get the results of the query (qty_records) which is 5 so I can use it in a PowerShell If statement.\n\n====\n\n$my_query = "select count(CustomerNumber) as qty_records from customers"\n\n$qty_records = Invoke-Sqlcmd -Query $my_query -ServerInstance "2008c" -Username sa -Password abc.1234 -Database MikeDB\n\nif ($qty_records -gt 4) {\n    write-host "do something"\n} else {\n    Write-Host "do something else"\n}\n\n\n======\nthanks\n    ',
    title:
      "How do I use results of PowerShell&#39;s &#39;invoke-SQLcmd&#39; in an &#39;if&#39; statement?",
    id: 308,
    PostTypeId: 1,
    bounty: 0.6805382981744605,
    UserId: 27,
    viewCount: 6,
    upvoteCount: 20,
    comments: 1
  },
  {
    body:
      "\nI think the problem here is that Invoke-SqlCmd returns a datarow even if it's only returning a single value, so you need to expose the actual content.  It's been a while since I worked in SQL so I'm a bit fuzzy on how the return values get named but I am reasonably sure based on your SELECT that it will return with a .qty_records property, so you would need to modify your if statement like so\n\nif ($qty_records.qty_records -gt 4) {\n  write-host \"do something\"\n} else {\n  Write-Host \"do something else\"\n}\n\n\nNote that it could return as .CustomerNumber if I recall the mechanics incorrectly.  If your interested in other methods of working with datarows I' recommend checking out This Post\n    ",
    id: 309,
    PostTypeId: 2,
    PostId: 308,
    bounty: 0.6805382981744605,
    UserId: 15,
    upvoteCount: 27
  },
  {
    body:
      '\n\nwe have a landing page that looks and works great in all browsers except for Safari 7.0.0.  We have added a div with id="counter" that is set to "display: flex;" and that style is being applied correctly in every browser except Safari 7.0.0 (on Mac). Somehow in Safari 7.0.0, that CSS style is being overridden by the User Agent Stylesheet for "div" which is applying "display:block;".  We have tried everything we can think of to fix this problem, such as making sure we are using the correct doctype, adding "!important" to the CSS styles in question and even adding inline styles, but to no avail!! This problem is only happening on my Employer\'s computer, any assistance anyone can give us would be much appreciated!\n\n#HTML\n<div id="counter" class="center-block text-center counter-wrapper">\n          <div class="card">\n            <div class="time">\n              <span id="days"></span>\n            </div>\n            <p>Days</p>\n          </div>\n          <div class="card">\n            <div class="time">\n              <span id="hours"></span>\n            </div>\n            <p>Hours</p>\n          </div>\n          <div class="card">\n            <div class="time">\n              <span id="minutes"></span>\n            </div>\n            <p>\n              <span class="hidden-xxs-down">Minutes</span>\n              <span class="hidden-xxs-up">Min</span>\n            </p>\n          </div>\n          <div class="card">\n            <div class="time">\n              <span id="seconds"></span>\n            </div>\n            <p>\n              <span class="hidden-xxs-down">Seconds</span>\n              <span class="hidden-xxs-up">Secs</span>\n            </p>\n          </div>\n          <div class="card">\n            <div class="time">\n              <span id="milliseconds"></span>\n            </div>\n            <p>\n              <span class="hidden-xxs-down">Millisec</span>\n              <span class="hidden-xxs-up">Msec</span>\n            </p>\n          </div>\n        </div> <!-- End Counter -->\n\n\n#CSS\ndiv#counter .counter-wrapper{\n display: flex !important;\n justify-content: space-between;\n flex-direction: row;\n flex-wrap: wrap;\n width: 85%;\n margin: 0 auto;\n -webkit-display: flex;\n -webkit-flex-direction: row;\n}\n\n    ',
    title:
      "Why is User Agent Stylesheet overriding my CSS stylesheets in Safari 7.0.0",
    id: 310,
    PostTypeId: 1,
    bounty: 0.4745257985816338,
    UserId: 91,
    viewCount: 3,
    upvoteCount: 12,
    comments: 1
  },
  {
    body:
      '\nIn the older version of Safari 7.0.0, any CSS rules utilizing Flex need to be preceded with "-webkit-", please see the documentation here: http://www.w3schools.com/css/css3_flexbox.asp\nAlso, it would probably just be best for the person with the problem computer to finally update their version of Safari to the latest one. Safari 7.0.0 came out in 2013....!\n    ',
    id: 311,
    PostTypeId: 2,
    PostId: 310,
    bounty: 0.4745257985816338,
    UserId: 12,
    upvoteCount: 12
  },
  {
    body:
      "\n\nI need to disable logging for a specific package of a 3rd party library in my Dropwizard app. I've tried this in the Dropwizard configuration file:\n\nlogging:\n    loggers:\n       org.springframework.amqp.rabbit.listener: WARN\n\n\nwhich is documented should work but I get this error:\n\njava.lang.IllegalArgumentException: Unsupported format of logger 'org.springframework.amqp.rabbit.listener'\n\n\nAny help or thoughts greatly appreciated. Thanks.\n    ",
    title: "Turn off logging for a package in Dropwizard app",
    id: 312,
    PostTypeId: 1,
    bounty: 0.8968318371661683,
    UserId: 29,
    viewCount: 10,
    upvoteCount: 22,
    comments: 1
  },
  {
    body:
      '\nThe answer for me was to put "OFF" in quotes. Not sure why - I didn\'t find any documentation of this, I just tried it and it worked!\n    ',
    id: 313,
    PostTypeId: 2,
    PostId: 312,
    bounty: 0.8968318371661683,
    UserId: 1,
    upvoteCount: 1
  },
  {
    body:
      '\n\nI am building a browser. \n\nwebview has list of function such as mainframeURL and accessibilityURL. \n\nI also figure out how to get the update link by doing this:\n\n@IBOutlet weak var webview: WebView!\n\nfunc webViewDidFinishLoad(_ webView : WebView) {\n    let url = self.webview.mainFrameURL\n\n    if  url == nil {\n        print("http://google.com/")   \n    }\n    else {\n        print(url )\n    }\n}\n\n\nI wonder how can I get access to download button of website from WebView.\n    ',
    title: "How to download files from webview in macOS?",
    id: 314,
    PostTypeId: 1,
    bounty: 0.09601329387953017,
    UserId: 44,
    viewCount: 3,
    upvoteCount: 21,
    comments: 2
  },
  {
    body:
      '\nIf user clicked a link, webView(_:decidePolicyForNavigationAction:request:frame:decisionListener:)\ndelegate method of WebView\'s WebPolicyDelegate will be invoked. You can process your download here.\n\nOr if your "get access to download button" means getting a button element itself, you can dig DOMElement tree:\n\nextension WebView {\n    var rootElement: DOMElement {\n        return self.mainFrame.domDocument.documentElement\n    }\n} \n\n    ',
    id: 315,
    PostTypeId: 2,
    PostId: 314,
    bounty: 0.09601329387953017,
    UserId: 68,
    upvoteCount: 34
  },
  {
    body:
      "\nI had try to implement this way.\n\nfunc webView( _ webView: WebView!,\n                      decidePolicyForNavigationAction actionInformation: [AnyHashable : Any]!,\n                      request: URLRequest!,\n                      frame: WebFrame!,\n                      decisionListener listener: WebPolicyDecisionListener!){\n   webView.stringByEvaluatingJavaScript(from: \"document.getElementById('Download').click()\")\n   llet url = request.url!.absoluteString \n    // I need to get the url link \n   print( url)\n        }\noverride func viewDidLoad() {\n    super.viewDidLoad()\n  /// how can I implement the function to make it work ?\n    self.webView(NSwebView, decidePolicyForNavigationAction: nil, request: nil, frame: nil, decisionListener: nil)\n}\n\n    ",
    id: 316,
    PostTypeId: 2,
    PostId: 314,
    bounty: 0.09601329387953017,
    UserId: 5,
    upvoteCount: 8
  },
  {
    body:
      "\n\nI am trying to adapt this tutorial in angular 2. https://kuamoto.wordpress.com/2016/02/26/myth-1-cant-make-offline-apps/comment-page-1/#comment-17\n\nI found this related issue :\nLeaflet: Can't extend TileLayer with typescript 2.0 & angular 2\nI don't know if I have the correct index.d.ts file (I provided it below)\n\nI get the following error while I try to extend tileLayer :  Property 'extend' does not exist on type 'typeof tileLayer' \n\nvar lyr = L.tileLayer.extend({\n    mbTilesDB: null,\n\n    initialize: function(url, options, db) {\n        console.log(\"sql plugin: \" + db);\n        this.mbTilesDB = db;\n    },\n    getTileUrl: function(tilePoint, zoom, tile) {\n        [...]\n    },\n    _loadTile: function(tile, tilePoint, zoom) {\n        tile._layer = this;\n        tile.onload = this._tileOnLoad;\n        tile.onerror = this._tileOnError;\n        this.getTileUrl(tilePoint, zoom, tile);\n    }\n});\n\n\nThis is how I import Leaflet :\n\nimport * as L from 'leaflet';\n\n\nAnd this is the extract from the index.d.ts file related to TileLayer : \n\nexport interface TileLayerOptions extends GridLayerOptions {\n    minZoom?: number;\n    maxZoom?: number;\n    maxNativeZoom?: number;\n    subdomains?: string | Array<string>;\n    errorTileUrl?: string;\n    zoomOffset?: number;\n    tms?: boolean;\n    zoomReverse?: boolean;\n    detectRetina?: boolean;\n    crossOrigin?: boolean;\n    [name: string]: any;\n}\n\nexport interface TileLayer extends GridLayer {\n    setUrl(url: string, noRedraw?: boolean): this;\n}\n\nexport function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;\n\nexport interface WMSOptions extends TileLayerOptions {\n    layers: string;\n    styles?: string;\n    format?: string;\n    transparent?: boolean;\n    version?: string;\n    crs?: CRS;\n    uppercase?: boolean;\n}\n\nexport interface WMS extends TileLayer {\n    setParams(params: Object, noRedraw?: boolean): this;\n}\n\nexport namespace tileLayer {\n    export function wms(baseUrl: string, options: WMSOptions): WMS;\n}\n\n\nThank you for your help\n    ",
    title: "Extend an existing class in Angular 2 for Leaflet TileLayer",
    id: 317,
    PostTypeId: 1,
    bounty: 0.6372049460955655,
    UserId: 47,
    viewCount: 2,
    upvoteCount: 14,
    comments: 1
  },
  {
    body:
      "\nBased on what is written in the following bug report https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11693 it doesn't look like the extend functions are fully implemented in the typescript binding. The recommended approach from the article is to use the following syntax: \n\nvar lyr = (L.tileLayer as any).extend({});\n\n\nThis make the the project compile for me.  \n    ",
    id: 318,
    PostTypeId: 2,
    PostId: 317,
    bounty: 0.6372049460955655,
    UserId: 73,
    upvoteCount: 12
  },
  {
    body:
      "\n\nSummary\n\nProcedure:\nI have three functions. Function A, B, and C. Function A uses apply() to apply function B and C to a global Pandas DataFrame. \n\nProblem:\nInspecting the results shows that only Function B was applied to the global dataframe\n\nOther notes: \nIf I apply Function C from the python interpreter, then it works. \n\n\n\nThe long version\n\nThe three main functions in this problem are:\n\nload_paypal(): Loads data into a gobal Pandas DataFrame and applies the other two functions on a couple columns.\n\nread_cash(): reads in the value, strips dollar signs, commas etc and returns a number\n\nread_date(): reads a string and returns a datetime.\n\nThe problem I'm having is that when I use apply() to apply read_cash, it appears to work but read_date doesn't. Additionally, when I use the read_date function with apply from the python interpreter, with the exact same code, I get the expected results, ie it works.\n\nFunctions\n\nload_paypal\n\ndef load_paypal():\n    global paypal_data\n    paypal_data = pd.DataFrame( pd.read_csv(open(\"Download.csv\") ) )\n    paypal_data = paypal_data.fillna(0)\n    cash_names = ('Gross', 'Fee', 'Net', 'Shipping and Handling Amount', 'Sales Tax', 'Balance')\n\n    for names in cash_names:\n        paypal_data[names].apply( ryan_tools.read_cash )\n\n    paypal_data = paypal_data.rename(columns = { paypal_data.columns[0] : 'Date'})\n\n    paypal_data['Date'].apply( ryan_tools.read_date )\n    print( paypal_data['Date'] ) # The 'Date' datatype is still a string here\n    print( paypal_data['Net'] ) # The 'Net' datatype is proven to be converted\n    # to a number over here( It definitely starts out as a string )\n    return\n\n\nryan_tools.read_date\n\ndef read_date(text):\n    for fmt in ( '%m/%d/%y' , '%M/%D/%y' , '%m/%d/%Y', '%Y/%m/%d', '%Y/%M/%D', 'Report Date :%m/%d/%Y', '%Y%M%D' , '%Y%m%d' ):\n        try:\n            return datetime.datetime.strptime(text, fmt)\n        except ValueError:\n            pass\n    raise ValueError('No Valid Date found')\n\n\nryan_tools.read_cash\n\ndef read_cash(text):\n    text = str(text)\n    if text == '':\n        return 0\n    temp = text.replace(' ', '')\n    temp = text.replace(',', '')\n    temp = temp.replace('$', '')\n\n    if ('(' in temp or ')' in temp):\n        temp = temp.replace('(', '')\n        temp = temp.replace(')', '')\n        ans = float(temp) * -1.0\n        return ans\n    ans = round(float(temp),2)\n\n    return ans\n\n\nNotes: ryan_tools is just my general file of commonly used useful functions\n    ",
    title: "Pandas Apply function not working consistently (Python 3)",
    id: 319,
    PostTypeId: 1,
    bounty: 0.4176518428435094,
    UserId: 29,
    viewCount: 10,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      "\n.apply() is not an in-place operation(i.e., it returns a new object rather than modifying the original):\n\nIn [3]: df = pd.DataFrame(np.arange(10).reshape(2,5))\n\nIn [4]: df\nOut[4]:\n   0  1  2  3  4\n0  0  1  2  3  4\n1  5  6  7  8  9\n\nIn [5]: df[4].apply(lambda x: x+100)\nOut[5]:\n0    104\n1    109\nName: 4, dtype: int64\n\nIn [6]: df\nOut[6]:\n   0  1  2  3  4\n0  0  1  2  3  4\n1  5  6  7  8  9\n\n\nWhat you probably want is to reassign the column to the new one created by your .apply():\n\npaypal_data['Date'] = paypal_data['Date'].apply(ryan_tools.read_date)\n\n    ",
    id: 320,
    PostTypeId: 2,
    PostId: 319,
    bounty: 0.4176518428435094,
    UserId: 57,
    upvoteCount: 21
  },
  {
    body:
      "\n\nI'm making a call to an API but the API will only provide me one year of data at a time.  But I would like to use a loop to pull in more than just one year of data.  \n\nI have the following start and end date in a range: \n\nstartdate = datetime.date(2011, 9, 6)\nenddate = datetime.date(2014, 10, 12)\n\n\nI have a long function written (not shown here) and use the following code to call the function and pass in the arguments: \n\nget_hourly_WSI_latlong_historical (startdate, enddate, lat, long, fields = None)\n\n\nHow do I write the following large chunk of code below inside a looping function? ...it must be in function format.  In the code below, instead of listing out each start and end date explicitly, I want those values to be derived dynamically based on the 'startdate' and 'enddate' variables I provided above. How can I do that?  \n\nWSI_Hourly = get_hourly_WSI_latlong_historical (datetime.date(2011, 9, 6), datetime.date(2011, 12, 31), 39.742721,-105.0816042, fields=None)\nWSI_Hourly1 = get_hourly_WSI_latlong_historical (datetime.date(2012,1,1), datetime.date(2012,12,31), 39.742721,-105.0816042, fields=None)\nWSI_Hourly = WSI_Hourly.append(WSI_Hourly1,ignore_index=True)\nWSI_Hourly1 = get_hourly_WSI_latlong_historical (datetime.date(2013,1,1), datetime.date(2013,12,31), 39.742721,-105.0816042, fields=None)\nWSI_Hourly = WSI_Hourly.append(WSI_Hourly1,ignore_index=True)\nWSI_Hourly1 = get_hourly_WSI_latlong_historical (datetime.date(2014,1,1), datetime.date(2014,10,12), 39.742721,-105.0816042, fields=None)\nWSI_Hourly = WSI_Hourly.append(WSI_Hourly1,ignore_index=True)\n\n\nAny help is greatly appreciated.  \n    ",
    title: "Looping dates dynamically inside a function with Python",
    id: 321,
    PostTypeId: 1,
    bounty: 0.9431369324214856,
    UserId: 52,
    viewCount: 9,
    upvoteCount: 19,
    comments: 1
  },
  {
    body:
      "\nJust find years between startdate and enddate\n\nfrom datetime import datetime\n\ndef get_hourly_WSI_latlong_historical(datetime1, datetime2):\n    #YOUR CODE HERE\n\ndef my_wrapper_func(startdate, enddate):\n    middle_years = range(startdate.year+1, enddate.year)\n    _all = []\n    _all.append(get_hourly_WSI_latlong_historical(startdate, datetime(startdate.year, 12, 31)))\n    for year in middle_years:\n        _all.append(get_hourly_WSI_latlong_historical(datetime(year, 1, 1), datetime(year, 12, 31)))\n    _all.append(get_hourly_WSI_latlong_historical(datetime(enddate.year, 1, 1), datetime(enddate.year, 12, 31)))\n    return _all\n\nmy_wrapper_func(datetime(2010, 2, 1), datetime(2015, 2,1))\n\n    ",
    id: 322,
    PostTypeId: 2,
    PostId: 321,
    bounty: 0.9431369324214856,
    UserId: 37,
    upvoteCount: 36
  },
  {
    body:
      '\n\nI have 80 separate .csv files that have the same columns and headers that I was able to import and rbind as one dataframe using the following commands:\n\n file_names <- dir("~/Desktop/data") \n df <- do.call(rbind,lapply(file_names,read.csv))\n\n\nBut I would like to add a new variable ("name") that identifies from which .csv file each observation came from. So for example, this variable "name" would be "NY" for all the observations from the \'NY.csv\' file and "DC" for all observations from the \'DC.csv\' file, etc...\nIs there any way to do this without adding this new column manually on each .csv? Thanks!\n    ',
    title:
      "Importing multiple .csv files into R and adding a new column with file name",
    id: 323,
    PostTypeId: 1,
    bounty: 0.3465778745118806,
    UserId: 65,
    viewCount: 6,
    upvoteCount: 3,
    comments: 1
  },
  {
    body:
      "\nThis should do it:\n\nfile_names <- dir(\"~/Desktop/data\") \ndf <- do.call(rbind, lapply(file_names, function(x) cbind(read.csv(x), name=strsplit(x,'\\\\.')[[1]][1])))\n\n    ",
    id: 324,
    PostTypeId: 2,
    PostId: 323,
    bounty: 0.3465778745118806,
    UserId: 11,
    upvoteCount: 37
  },
  {
    body:
      "\n\nI am trying to unit test retrieving assetCollection and assets. In order to be allowed to access my PhotoAlbums I have to grant permissions. This normally either happens during the first call of a function like fetchAssetCollections or manually by calling PHPhotoLibrary.requestAuthorization().\n\nNow the question is how can I assume I have permissions when running my unit tests? Because as soon as I call PHAssetCollection.fetchAssetCollections(withLocalIdentifiers: [ album ], options: nil) I get a PHUnauthorizedFetchResult.\n    ",
    title: "Unit Test PHFetchResult",
    id: 325,
    PostTypeId: 1,
    bounty: 0.9603369397483881,
    UserId: 39,
    viewCount: 8,
    upvoteCount: 39,
    comments: 0
  },
  {
    body:
      '\n\nI had a related question heretofore, and the answer there that (pretty much) works for me is to use:\n\npt.ShowInCompactForm();\n\n\nIn a spreadsheet I generate, there are blocks of items that span 5 rows - the first row is a Description, and the four rows below it are "subrows" with detail data for that item (namely, "Total Packages", "Total Purchases", "Sum of Average Price", and "Percentage of Total").\n\nIn certain cases, I need to colorize the cells in that region and am able to do this, for the most part, with the following code:\n\nprivate void ColorizeContractItemBlocks(List<string> contractItemDescs)\n{\n    int FIRST_DESCRIPTION_ROW = 7;\n    int DESCRIPTION_COL = 0;\n    int ROWS_BETWEEN_DESCRIPTIONS = 5; \n    var pivot = pivotTableSheet.PivotTables[0];\n    var dataBodyRange = pivot.DataBodyRange;\n    int currentRowBeingExamined = FIRST_DESCRIPTION_ROW;\n    int rowsUsed = dataBodyRange.EndRow;\n\n    pivot.RefreshData();\n    pivot.CalculateData();\n\n    PivotTable pt = pivotTableSheet.PivotTables[0];\n    var style = workBook.CreateStyle();\n\n    // Loop through PivotTable data, colorizing contract items\n    while (currentRowBeingExamined < rowsUsed)\n    {\n        Cell descriptionCell = pivotTableSheet.Cells[currentRowBeingExamined, DESCRIPTION_COL];\n        String desc = descriptionCell.Value.ToString();\n\n        if (contractItemDescs.Contains(desc))\n        {\n            style.BackgroundColor = CONTRACT_ITEM_COLOR;\n            style.Pattern = BackgroundType.Solid;\n\n            CellArea columnRange = pt.ColumnRange;\n            // Using StartColumn-1 instead of StartColumn-1 gives me the "Percentage of Total" data field subrow (but not the others - "Total Packages", "Total Purchases", and "Sum of Average Price")\n            for (int c = columnRange.StartColumn-1; c <= columnRange.EndColumn; c++)\n            {\n                //pt.Format(currentRowBeingExamined-1, c, style); <= Instead of adding the "Description" row, this colors up some unrelated final ("Percentage of Total") data rows\n                pt.Format(currentRowBeingExamined, c, style);\n                pt.Format(currentRowBeingExamined + 1, c, style);\n                pt.Format(currentRowBeingExamined + 2, c, style);\n                pt.Format(currentRowBeingExamined + 3, c, style);\n            }\n\n        }\n        currentRowBeingExamined = currentRowBeingExamined + ROWS_BETWEEN_DESCRIPTIONS;\n    }\n}\n\n\nBut it only works "for the most part," because I am unable to colorize the "Description" row (such as, "AVOCADOS, HASS 70 CT #2") or any but the last row of column 0/A, - the "Percentage of Total" subrow, as can be seen here:\n\n\n\nIt may be that the Description row is better left untainted/unpainted, but I think the subrows beneath would be better off colorized, and I don\'t understand why they are not. \n\nI can prevent ALL of those subrows from being colored by using this:\n\nfor (int c = columnRange.StartColumn; c <= columnRange.EndColumn; c++)\n\n\n(that is to say, starting the loop with "StartColumn" instead of "StartColumn-1" prevents anything in column 0/A from being colorized), but it seems bizarre to me that only that last subrow colors up when I start from one column back (at 0/A).\n    ',
    title:
      "How can I color all the related rows and columns, rather than just a subset of them (Aspose Cells)?",
    id: 326,
    PostTypeId: 1,
    bounty: 0.3287194581063395,
    UserId: 33,
    viewCount: 3,
    upvoteCount: 12,
    comments: 1
  },
  {
    body:
      "\nWe will look into your issue in this Aspose.Cells Forum Thread created by you.\n\nNote: I am working as Developer Evangelist at Aspose\n    ",
    id: 327,
    PostTypeId: 2,
    PostId: 326,
    bounty: 0.3287194581063395,
    UserId: 40,
    upvoteCount: 34
  },
  {
    body:
      '\n\nI have the following dataset: \n\ndf<-data.frame (fact= c("a,b,c,d","f,g,h,v"), value = c("0,1,0,1" , "0,0,1,0"))\n\n\nThis is the data:\n\n   fact   value\n1 a,b,c,d 0,1,0,1\n2 f,g,h,v 0,0,1,0\n\n\nI wish to split it when the value is 1. So, my ideal output is: \n\n fact     value\n\n1:  a,b     0,1\n2:  c,d     0,1\n3: f,g,h    0,0,1\n4:  v       0\n\n\nFirstly, I thought I might find a way by using cut like: \n\ncut(as.numeric(strsplit(as.character(df$value), split = ",")), breaks =1)\n\n\nBut none of my attempts get close. \n    ',
    title: "split strings and add them as new row",
    id: 328,
    PostTypeId: 1,
    bounty: 0.8211856334672705,
    UserId: 89,
    viewCount: 5,
    upvoteCount: 31,
    comments: 6
  },
  {
    body:
      '\nOne way is to split the character vectors for fact and value in the original data frame by "," using strsplit and then determine the position of the first "1" in the split values. Then use this position to determine the split for both fact and value:\n\nsv <- strsplit(df$value,",")\nsf <- strsplit(df$fact,",")\npos <- sapply(sv, function(sv) {j <- which(sv=="1"); if (length(j)==0) NA else j[1]})\nout <- do.call(rbind,lapply(1:length(pos),function(i,sv,sf,pos) {\n  if (is.na(pos[i]) || pos[i] == length(sf[[i]])) \n    data.frame(fact=toString(sf[[i]]),value=toString(sv[[i]])) \n  else \n    data.frame(fact=c(toString(sf[[i]][1:pos[i]]),\n                      toString(sf[[i]][(pos[i]+1):length(sf[[i]])])),\n               value=c(toString(sv[[i]][1:pos[i]]),\n                       toString(sv[[i]][(pos[i]+1):length(sv[[i]])])))\n  },sv,sf,pos))\n##     fact   value\n##1    a, b    0, 1\n##2    c, d    0, 1\n##3 f, g, h 0, 0, 1\n##4       v       0\n\n\nThis answer assumes that there is a "1" in the value to split. If there is not or if the "1" is at the end of value, then that row in df is not split in the output.\n    ',
    id: 329,
    PostTypeId: 2,
    PostId: 328,
    bounty: 0.8211856334672705,
    UserId: 31,
    upvoteCount: 22
  },
  {
    body:
      '\nFirst we split the strings in fact and value into separate values and stack them so that each becomes a column of values in a data frame. Now, using value, we want each run of zeroes followed by a 1 to become a group. These are the groups of values that we want to paste together at the end. We\'ll use dplyr to operate separately on each group to return the final data frame.\n\nlibrary(dplyr) \nlibrary(purrr)  # For map function\nlibrary(tidyr)  # For separate_rows function\n\ndf %>% \n  separate_rows(fact, value, sep=",") %>%\n  mutate(group = lag(cumsum(value == 1), default=0)) %>%\n  group_by(group) %>%\n  summarise(fact = paste(fact, collapse=","),\n            value = paste(value, collapse=",")) %>%\n  select(-group)     \n\n   fact value \n1   a,b   0,1\n2   c,d   0,1\n3 f,g,h 0,0,1\n4     v     0\n\n    ',
    id: 330,
    PostTypeId: 2,
    PostId: 328,
    bounty: 0.8211856334672705,
    UserId: 26,
    upvoteCount: 18
  },
  {
    body:
      '\nOne data.table approach would be the following. You split each element in fact and value using cSplit() in the splitstackshape package. This creates a data.table in a long format. Once you have the result, you create a group variable using diff() and cumsum() Wherever a difference in value is smaller than 0, R creates a new group. Then, you want to apply paste() to both fact and value. You can achieve this using lapply(.SD ...). This is the equivalence of summarise_at() in the dplyr package.  In the end, you remove the group variable. \n\nlibrary(splitstackshape)\nlibrary(data.table)\n\ncSplit(df, splitCols = c("fact", "value"),\n       direction = "long", sep = ",") -> temp\n\ntemp[, group := cumsum(c(FALSE, diff(value) < 0))][,\n       lapply(.SD, function(x){paste(x, collapse = ",")}),\n       .SDcols = fact:value,\n       by = group][, group :=NULL] -> out\n\n#    fact value\n#1:   a,b   0,1\n#2:   c,d   0,1\n#3: f,g,h 0,0,1\n#4:     v     0\n\n    ',
    id: 331,
    PostTypeId: 2,
    PostId: 328,
    bounty: 0.8211856334672705,
    UserId: 86,
    upvoteCount: 27
  },
  {
    body:
      '\nAnother base R attempt:\n\nsf <- strsplit(as.character(df$fact), ",")\nsv <- strsplit(as.character(df$value), ",")\nspl <- lapply(sv, function(x) -rev(cumsum(as.numeric(rev(x)))) )\n#[[1]]\n#[1] -2 -2 -1 -1\n#\n#[[2]]\n#[1] -1 -1 -1  0\n\njoinfun <- function(x) sapply(unlist(Map(split, x, spl), rec=FALSE), paste, collapse=",")\n\n# to show you what is happening:\n#> Map(split, sf, spl)\n#[[1]]\n#[[1]]$`-2`\n#[1] "a" "b"\n#\n#[[1]]$`-1`\n#[1] "c" "d"\n# \n#\n#[[2]]\n#[[2]]$`-1`\n#[1] "f" "g" "h"\n#\n#[[2]]$`0`\n#[1] "v"\n\ndata.frame(fact  = joinfun(sf), value = joinfun(sv) )\n#   fact value\n#1   a,b   0,1\n#2   c,d   0,1\n#3 f,g,h 0,0,1\n#4     v     0\n\n    ',
    id: 332,
    PostTypeId: 2,
    PostId: 328,
    bounty: 0.8211856334672705,
    UserId: 20,
    upvoteCount: 2
  },
  {
    body:
      '\nA bit late to the party, but here is a solution that utilizes regular expressions and tidyverse functions:\n\n#install.packages("devtools")\n#devtools::install_github("hadley/tidyverse")\n\nlibrary(tidyverse)\n\ndff <- data.frame(fact= c("a,b,c,d","f,g,h,v"), \n                   value = c("0,1,0,1" , "0,0,1,0"), \n                   stringsAsFactors = F)\n\ndff %>% \n  mutate(value = gsub("(?<=1),(?=0)","-", value, perl = T)) %>%\n  group_by(value) %>%\n  mutate(indices = which(strsplit(value,split="")[[1]]=="-"),\n         fact = sprintf("%s-%s", \n                        substr(fact, 0, indices - 1), \n                        substr(fact, indices + 1, nchar(fact)))) %>%\n  select(fact, value) %>% \n  ungroup() %>%\n  separate_rows(fact, value, sep = "-")\n\n\nThis finds the commas placed right after 1 in the value column and then replaces those commas with a dash (-). It then gets the indices of those dashes in each row of the value column and feeds them to the fact column to replace the corresponding commas there with dashes as well. Subsequently, it uses separate_rows to split both the fact and value columns on those dashes.\nIt should yield the following:\n\n#     fact value\n#   <chr> <chr>\n# 1   a,b   0,1\n# 2   c,d   0,1\n# 3 f,g,h 0,0,1\n# 4     v     0\n\n    ',
    id: 333,
    PostTypeId: 2,
    PostId: 328,
    bounty: 0.8211856334672705,
    UserId: 90,
    upvoteCount: 34
  },
  {
    body:
      '\nHave replaced solution with this simpler one.\n\nNo packages are used.  The columns of df may be character or factor -- the code converts them to character. value entries in the input may contain no ones.  The fact and value components on the same row of the input should have the same number of comma-separated fields but may have different numbers of fields on different rows.\n\ndo.call("rbind", by(df, 1:nrow(df), function(x) {\n  long <- lapply(x, function(x) unlist(strsplit(as.character(x), ",")))\n  g <- -rev(cumsum(rev(long$value == 1)))\n  aggregate(long, list(g), paste, collapse = ",")[names(x)]\n}))\n\n\ngiving:\n\n   fact value\n1   a,b   0,1\n2   c,d   0,1\n5 f,g,h 0,0,1\n6     v     0\n\n\nby calls the anonymous function shown once for each row.  For each row it splits each column by comma giving the long form long for that row.  For example, for the iteration that processes first row of df the value of long is:\n\nlong <- list(fact = c("a", "b", "c", "d"), value = c("0", "1", "0", "1"))\n\n\nWe then calculate a grouping variable g for the row.  For example, for the first iteration it equals:\n\ng <- c(-2L, -2L, -1L, -1L)\n\n\nFinally we aggregate by g pasting the elements from each column having the same group together.  We drop the extra columns that aggegate has added.  \n\nAt the end we rbind the data.frames for all rows together.\n    ',
    id: 334,
    PostTypeId: 2,
    PostId: 328,
    bounty: 0.8211856334672705,
    UserId: 3,
    upvoteCount: 6
  },
  {
    body:
      "\n\nI recently experienced a rather frightening issue trying to debug some TypeScript code using Internet Explorer 11 / Visual Studio 2015, in an Aurelia CLI project.\n\nI made a small change to the code, it compiled fine, but when debugging, my breakpoints were corrupted all of a sudden - the debugger worked but it was hitting totally unrelated code. I couldn't debug, basically. It seems as if the source maps had been corrupted somehow.\n\nI then reverted the code, recompiled and the problem went away. It came back as soon as I tried the code change again, so it's not some temporary glitch in the IDE or browser.\n\nCan anyone help me understand this problem in more detail if they've had similar issues and found a resolution? I'm really concerned about the stability of the debugging experience for developers now, if adding a single line of code can do this.\n    ",
    title:
      "TypeScript source maps become corrupt when debugging Aurelia CLI project in IE / VS 2015",
    id: 335,
    PostTypeId: 1,
    bounty: 0.9684749663150487,
    UserId: 74,
    viewCount: 6,
    upvoteCount: 26,
    comments: 0
  },
  {
    body:
      '\n\nI am attempting to present a view controller modally from within a navigation controller stack and then return to that specific view controller index after dismissal. This NavigationController is within a UITabBarController.\n\nMy app is written with XIBs and programatic navigation controllers and tab bar controllers. I am not using storyboards. Navigation Controller navigation is all done with self.navigationController.pushViewController(viewController: TabOnePageTwoViewController, animated: true) \n\nHere is my view controller configuration.\n\nRootTabBarController -> UINavigationController(rootViewController: TabOneController) -> TabOnePageOneController -> ModalView\n\nThe issue is, when I self.dismiss() from within the modal presented view, I am returned to the root of the navigation controller instead of the view which presented the modal, TabOneController\n\nI am thinking the right way to do this is select the view controller out of the navigation controller stack and popToViewController for the right one.\n\nTo accomplish this, I am thinking that in the completion block of self.dismiss() I need to navigate to my correct view controller.\n\n    let viewControllers = self.navigationController!.viewControllers\n\n    self.dismiss(animated: true, completion: {\n        for aViewController in viewControllers {\n            if(aViewController is TabOnePageTwoViewViewController){\n                print("navigating back to page one now")\n                self.navigationController!.popToViewController(aViewController, animated: true);\n            }\n        }\n    })\n\n\n`\n\nUnfortunately, this does not work. As far as I can tell, self.navigationController is not accessible from within the modal view.\n\nHow can I return to a navigation controller index after dismissing a modal it presented?\n\nI have uploaded the example app to github at the following URL: https://github.com/thexande/TabControllerAndNavigationControllerExample\n\nIf you know programatic navigation within IOS well, download it and take a look! \n\nTHANKS ALL!! \n    ',
    title:
      "Return to Navigation Controller index after modal dismissal (no storyboards)",
    id: 336,
    PostTypeId: 1,
    bounty: 0.9601569000252226,
    UserId: 43,
    viewCount: 8,
    upvoteCount: 30,
    comments: 1
  },
  {
    body:
      '\nI have taken a look on your sample project on Github. \n\nThere is only a minor problem why your sample project does not work properly. \n\nYou should be setting up the navigationStack in the RootTabBarViewController viewDidLoad method, not it viewWillAppear. This is some weird behaviour, maybe a bug in the framework, i can not find any documentation why should it happen there, but it does.\n\nSo remove viewWillAppear and your viewDidLoad should look the following:\n\noverride func viewDidLoad() {\n        super.viewDidLoad()\n        self.delegate = self\n        let tabOne = UINavigationController(rootViewController: TabOneViewController())\n        tabOne.title = "Tab One"\n        let tabTwo = UINavigationController(rootViewController: TabTwoViewController())\n        tabTwo.title = "Tab Two"\n        self.viewControllers = [tabOne, tabTwo]\n}\n\n    ',
    id: 337,
    PostTypeId: 2,
    PostId: 336,
    bounty: 0.9601569000252226,
    UserId: 19,
    upvoteCount: 30
  },
  {
    body:
      "\n\nI am working on a Haskell application, running in the browser compiled with GHCJS, which communicates with a server, also written in Haskell, over websockets. Both programs share the same Haskell data type definition, and I “just” have to pick serialization format.\n\nAt the moment, for simplicity, the program runs on Read and Show, which works, but is obviously not ideal.\n\nOn the other hand, it is unclear if the usual contenders for fast serialization, such as the cereal library, which work on ByteStrings are actually going to be efficient in GHCJS. Furthermore, GHCJS’s API seems to make it hard to let ByteStrings interact with the binary Blob type that the JavaScript bindings to Websockets provide.\n\nGeneric code generation (using GHC.Generics) would be nice.\n\nHas anyone solved this problem before?  Possibly even benchmarked various serialization variants on GHCJS?\n    ",
    title: "Most efficient wire format for GHCJS code over websockets",
    id: 338,
    PostTypeId: 1,
    bounty: 0.8249944775676146,
    UserId: 63,
    viewCount: 2,
    upvoteCount: 16,
    comments: 1
  },
  {
    body:
      "\nWe were looking for a fast serializer/deserializer library in Haskell to store data in a reddis cache last year and eventually we ended up using ProtoBuf! That was partially because we already had ProtoBuf implementation of all of the objects that we wanted to serialize, but the performance was also much better compared to cereal/binary. By the time, store was non-existent.\n\nThe size and the speed of serialization/deserialization very much depends on your data as well. For instance, if you have lots of smallish (say in the range 1 to 100) 64 bit numbers, protobuf (because of its base 128 variant encoding) or even JSON could be more efficient than cereal or binary (that I guess use a fixed size for numbers regardless of their values).\n\nThere is also Typed-Wire that allows you to do serialization across a few languages, but I think it uses JSON as the underlying implementation.\n\ni have no experience with GHCJS, but I'd recommend trying store first. Just make sure client and server have no little/big endianness incompatibility.\n    ",
    id: 339,
    PostTypeId: 2,
    PostId: 338,
    bounty: 0.8249944775676146,
    UserId: 93,
    upvoteCount: 38
  },
  {
    body:
      '\n\nI am building an Angular 2 app, and so far most things have gone according to plan. However, today when I went to boot up my app, I get an error message in the browser console saying:\n\nError: Error: XHR error (404 Not Found) loading http://localhost:3000/node_modules//socket.io-client/socket.io.js(…)\n\n\nWhat\'s bizarre to me is that a version of the app I have from a couple of days ago boots up with no problem, and none of the relevant parts of the app are any different. So... where to look to resolve this issue? Also, to clarify, no errors arise in the terminal when I type "npm start", instead I just get the "Loading..." text hanging in the browser, and when I look at the console, that\'s when I see the error I included above.\n\nHere\'s my package.json file:\n\n{\n  "name": "abc",\n  "version": "0.0.1",\n  "scripts": {\n    "start": "tsc && concurrently \\"npm run tsc:w\\" \\"npm run lite\\" ",\n    "lite": "lite-server",\n    "postinstall": "typings install",\n    "tsc": "tsc",\n    "tsc:w": "tsc -w",\n    "typings": "typings",\n    "docs": "typedoc --experimentalDecorators --out docs/ app/ --target \'es5\' -module \'system\' --ignoreCompilerErrors",\n    "clean": "del /q dist",\n    "browserify": "^13.0.1",\n    "uglifyjs": "^2.4.10",\n    "minify": "uglifyjs dist/main.min.js --screw-ie8 --compress --mangle --output dist/main.min.js",\n    "build": "npm run clean && tsc",\n    "build_prod": "npm run build && browserify -s main dist/main.js > dist/main.min.js && npm run minify"\n  },\n  "license": "ISC",\n  "dependencies": {\n    "@angular/common": "^2.0.0",\n    "@angular/compiler": "^2.0.0",\n    "@angular/core": "^2.0.0",\n    "@angular/forms": "^2.0.0",\n    "@angular/http": "^2.0.0",\n    "@angular/material": "^2.0.0-alpha.10",\n    "@angular/platform-browser": "^2.0.0",\n    "@angular/platform-browser-dynamic": "^2.0.0",\n    "@angular/router": "^3.0.0",\n    "@angular2-material/button": "^2.0.0-alpha.8-2",\n    "@angular2-material/core": "^2.0.0-alpha.8-2",\n    "@angular2-material/input": "^2.0.0-alpha.8-2",\n    "angular-in-memory-web-api": "~0.1.15",\n    "bootstrap": "^3.3.6",\n    "core-js": "^2.4.1",\n    "hammerjs": "^2.0.8",\n    "reflect-metadata": "^0.1.3",\n    "rxjs": "5.0.0-beta.12",\n    "socket.io-client": "^1.4.8",\n    "systemjs": "0.19.27",\n    "typings": "^1.5.0",\n    "zone.js": "^0.6.23"\n  },\n  "devDependencies": {\n    "@types/hammerjs": "^2.0.32",\n    "browserify": "^13.0.1",\n    "concurrently": "^2.2.0",\n    "jasmine-core": "^2.5.2",\n    "karma": "^1.3.0",\n    "karma-chrome-launcher": "^2.0.0",\n    "karma-jasmine": "^1.0.2",\n    "lite-server": "^2.2.2",\n    "typescript": "^2.0.2",\n    "typings": "^1.5.0",\n    "uglifyjs": "^2.4.10"\n  }\n}\n\n    ',
    title: "Socket.io 404 Error on Angular 2 App",
    id: 340,
    PostTypeId: 1,
    bounty: 0.6024641440630367,
    UserId: 68,
    viewCount: 8,
    upvoteCount: 29,
    comments: 0
  },
  {
    body:
      '\n\nOkay, so I\'m trying to store the text from a file in a string, and everything was working OK until I noticed I wasn\'t reallocating the memory correctly, and it shouldn\'t be working. \n\nThis is my main function before correcting it:\n\nFILE * file;\nchar * quijote, thisChar;\nunsigned int writingAt = 0;\n\nfile = fopen("quijote.txt", "r");\nquijote = malloc(1);\n\nif (file != NULL) {\n    while (1) {\n        thisChar = (char)fgetc(file);\n        if (thisChar == EOF) {\n            break;\n        } else {\n            printf("strlen(quijote) = %lu; writingAt = %i\\n", strlen(quijote), writingAt);\n            quijote = (char *) realloc(quijote, (sizeof(quijote) + 1));\n            quijote[writingAt] = thisChar;\n            quijote[writingAt + 1] = \'\\0\';\n            writingAt++;\n        }\n    }\n} else {\n    perror("fopen");\n}\nfclose(file);\n\n\nIt works perfectly, and correctly stores all of the file in the string. Note that memory reallocation is incorrect, as sizeof(quijote) always has the same value (8) so theoretically it shouldn\'t be working.\n\nNow, when I corrected the reallocation, it randomly throws an EXC_BAD_ACCESS error when writingAt=135167. This is the "corrected" main function:\n\nFILE * file;\nchar * quijote, thisChar;\nunsigned int writingAt = 0;\n\nfile = fopen("quijote.txt", "r");\nquijote = malloc(1);\n\nif (file != NULL) {\n    while (1) {\n        thisChar = (char)fgetc(file);\n        if (thisChar == EOF) {\n            break;\n        } else {\n            printf("strlen(quijote) = %lu; writingAt = %i\\n", strlen(quijote), writingAt);\n            quijote = (char *) realloc(quijote, (writingAt + 1));\n            quijote[writingAt] = thisChar;\n            quijote[writingAt + 1] = \'\\0\';\n            writingAt++;\n        }\n    }\n} else {\n    perror("fopen");\n}\nfclose(file);\n\n\nAnd these are the last lines the program prints before the error: \n\nstrlen(quijote) = 135162; writingAt = 135162\nstrlen(quijote) = 135163; writingAt = 135163\nstrlen(quijote) = 135164; writingAt = 135164\nstrlen(quijote) = 135165; writingAt = 135165\nstrlen(quijote) = 135166; writingAt = 135166\nstrlen(quijote) = 135167; writingAt = 135167\nException: EXC_BAD_ACCESS (code=1, address=0x10fc20000)\n\n\nI don\'t understand why the previous code worked and this doesn\'t, or why the program throws the error in that specific number. Also, I\'ve tried reallocating to size 1 like this: quijote = (char *) realloc(quijote, 1); and for some reason it also works...\n    ',
    title:
      "Why does this dynamic string creation throw exc_bad_access error after a fixed number?",
    id: 341,
    PostTypeId: 1,
    bounty: 0.3780257144760004,
    UserId: 2,
    viewCount: 3,
    upvoteCount: 13,
    comments: 1
  },
  {
    body:
      "\nYou allocate writingAt + 1 characters, then access quijote[writingAt + 1] which is undefined behaviour - it's the (writingAt + 2)'th character, which is one more than the actual number of characters allocated.\n    ",
    id: 342,
    PostTypeId: 2,
    PostId: 341,
    bounty: 0.3780257144760004,
    UserId: 17,
    upvoteCount: 27
  },
  {
    body:
      "\n\nI am trying to create a new class called Battlefield. It supposed to derive from the class Environment and take all the methods and variables from that Environment class using the base keyword. Anyone knows how to use that base keyword? I've searched everywhere on Google, but most of what I came up with were not as helpful.\n\nMy environment class is an abstract class, and it has the following variable\n\n        protected List<ENTITY> entities = new List<ENTITY>();\n\n\nIts constructor\n\n        public ENVIRONMENT()\n        {\n            entities = new List<ENTITY>();\n        }\n\n        public ENVIRONMENT(List<ENTITY> entities)\n        {\n            this.entities = entities;\n        }\n\n\nand the following methods...\n\n        public void AddEntity(ENTITY e)\n        {\n        }\n\n        public List<ENTITY> Population\n        {\n            get { return entities; }\n        }\n\n        public void run()\n        {\n            // run method\n        }\n\n        public void step(int seed)\n        {\n           // step method\n        }\n\n\n}\n    ",
    title: "C# &quot;base&quot; keyword and template",
    id: 343,
    PostTypeId: 1,
    bounty: 0.9557996415320538,
    UserId: 88,
    viewCount: 9,
    upvoteCount: 12,
    comments: 1
  },
  {
    body:
      "\nYou only need the base keyword if you have a method in Battlefield that overrides the method of the same name in Environment, and you want the value from the Environment method instead of the value from the Battlefield override.  For example in Battlefield:\n\npublic class Battlefield : Environment {\n    public List<ENTITY> Population\n    {\n      get\n      {\n        var epop = base.Population;\n        return epop.Union(Casualties);\n      }\n    }\n\n    public List<ENTITY> Casualties\n    {\n      get { return this.casualties; }\n    }\n}\n\n    ",
    id: 344,
    PostTypeId: 2,
    PostId: 343,
    bounty: 0.9557996415320538,
    UserId: 6,
    upvoteCount: 24
  },
  {
    body:
      "\n\nLately I've been working on making a castle-fight game in Unity. I've gotten some animated soldier models, and plan on having a few hundred in the scene. Problem is, on mobile I can't even display 50 at a time without having the FPS go below 20. I've already asked this question on Unity's forums, with no reply :(\n\nHere's the link so you can see what I've done to optimize them so far: https://forum.unity3d.com/threads/playing-hundreds-of-animations-on-mobile.444599/\n\nI've never seen a game with dozens on animations on mobile. The closest I've seen is Fifa Mobile, but that's only about 20-30. \n\nDo you think it's possible to optimize the animations more than I have (as shown in the link), or is it just impossible to have hundreds of animations on mobile?\n\nThank you for sharing your knowledge!\n    ",
    title:
      "Optimizing animations to show dozens or even hundreds on mobile in Unity",
    id: 345,
    PostTypeId: 1,
    bounty: 0.2580586981440214,
    UserId: 63,
    viewCount: 6,
    upvoteCount: 18,
    comments: 1
  },
  {
    body:
      '\nKudos to @Blindman67 for giving me the general hang of things. With his help, I was able to create this script:\n\nusing System.Collections;\nusing System.Collections.Generic;\nusing UnityEditor;\nusing UnityEngine;\n\npublic class AnimationConverter : MonoBehaviour {\n\n//For example: Assets/_@MYSTUFF/StaticAnimations/\npublic string SaveLocation;\n//Shows progress in inspector, useful if your animation is long\npublic string Progress;\npublic Animator MyAnimator;\n//anim MUST be component of this.gameObject\npublic Animation anim;\npublic SkinnedMeshRenderer SkinMeshRender;\nprivate Mesh[] NewStaticMesh;\n//length of animation clip\nprivate float ClipLenth;\n//current animator int\nprivate int CurrentAnimatorInt;\n//just to make sure we run the code in Update ONCE\nprivate bool AllowUpdate;\n//how many frames do you want to make?\npublic int numberOfFrames;\n//time between frame captures\nprivate float WaitAmount;\n//How many frames done\npublic int AmountSoFar;\n\nprivate void Start()\n{\n    anim = this.gameObject.GetComponent<Animation>();\n    AllowUpdate = true;\n}\n\nprivate void Update()\n{\n    //I\'m getting an animation from my animator\'s current state\n    CurrentAnimatorInt = MyAnimator.GetInteger("SoldierState");\n    //checking to make sure we don\'t run more than once\n    if (AllowUpdate == true)\n    {\n        if (CurrentAnimatorInt == 1)\n        {\n            //don\'t run this again\n            AllowUpdate = false;\n            //the magic begins!\n            Debug.Log("Exporting static meshes from skinned mesh...");\n            ExportMeshes();\n        }\n    }\n}\n\nvoid ExportMeshes()\n{\n    NewStaticMesh = new Mesh[numberOfFrames];\n    ClipLenth = anim.clip.length;\n    WaitAmount = anim.clip.length / numberOfFrames;\n    //now let\'s start waiting for the animation to play\n    StartCoroutine(WaitForNextMesh());\n}\n\n//IMPORTANT: We\'re using a coroutine because if we don\'t, we\'ll create\n//the same static meshes because the animation won\'t change in 1 frame.\n//The purpose is to wait as the animation is playing, then make a static mesh at the correct time.\n\nIEnumerator WaitForNextMesh()\n{\n    yield return new WaitForSeconds(WaitAmount);\n    AmountSoFar++;\n    //wait done! Let\'s make the static mesh!\n    Mesh mesh = new Mesh();\n    SkinMeshRender.BakeMesh(mesh);\n    //show progress in inspector\n    Progress = "Working... " + (AmountSoFar * 100 / numberOfFrames).ToString() + "%";\n    AssetDatabase.CreateAsset(mesh, SaveLocation + AmountSoFar.ToString() + anim.clip.name + "_StaticFromSkinned" + ".asset");\n    //do it again!\n    if (AmountSoFar < numberOfFrames)\n    {\n        //do it again, we have more meshes to make!\n        StartCoroutine(WaitForNextMesh());\n    }\n\n    else\n    {\n        //created all meshes, we\'re done!\n        Progress = "All done! :)";\n        //spam the console in fancy ways\n        Debug.Log("<color=green><b>All meshes created! You\'ll find them here: </b></color>" + SaveLocation);\n        Debug.Log("<color=red><i>Don\'t forget to disable/change this script, or you\'ll do what you just did again!</i></color>");\n    }\n}\n}\n\n\nIt converts a skinned mesh to a series of static meshes. Then, I have this script to cycle thru those static meshes to make the animation:\n\nusing System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic class CharachterAnimator : MonoBehaviour {\n\npublic GameObject[] Frames;\npublic int CurrentFrame;\npublic float TimeBetweenFrames;\n// Use this for initialization\nvoid Start ()\n{\n    StartCoroutine(GoToFrame());\n}\n\nIEnumerator GoToFrame()\n{\n    var wait = new WaitForSeconds(TimeBetweenFrames);\n    while (true)\n    {\n        Frames[CurrentFrame].SetActive(true);\n        yield return wait;\n        Frames[CurrentFrame].SetActive(false);\n        CurrentFrame++;\n        if (CurrentFrame < Frames.Length)\n        {\n            Frames[CurrentFrame].SetActive(true);\n        }\n\n        else\n        {\n            CurrentFrame = 0;\n            Frames[0].SetActive(true);\n        }\n    }\n}\n}\n\n\nI added hundreds of soldiers to my scene, and Camera.Render takes most of the resources in the Profiler, so I can confidently say that while this method makes the animations look jerky, after all I\'m targeting Android devices (some of which are slower than a potato). The performance improvement is giant, and I should be able to get a few hundred of these characters going if I optimize Camera.Render (lighting, shadows etc... in Unity).\n\nOnce again, huge thanks to @Blindman67 for the idea that I was able to execute.\n    ',
    id: 346,
    PostTypeId: 2,
    PostId: 345,
    bounty: 0.2580586981440214,
    UserId: 95,
    upvoteCount: 17
  },
  {
    body:
      '\n\nI am working through Exercise 20 of Learn Ruby the Hard Way, and am trying to make sense of the difference in output between defining the variable "current_file" and simply using open(ARGV.first):\n\nHere is the input file test.txt:\n\nThis is line 1\nThis is line 2\nThis is line 3\n\n\nHere is the beginning of the script:\n\ninput_file = ARGV.first\n\ndef print_a_line(f)\n  puts "#{f.gets}"\nend\n\ncurrent_file = open(input_file)\n\n\nWhen I call the print_a_line with the declared variable:\n\nprint_a_line(current_file)\nprint_a_line(current_file)\nprint_a_line(current_file)\n\n\nThen f.gets tracks to the new line each time:\n\nThis is line 1\nThis in line 2\nThis is line 3\n\n\nHowever, if I call the function with ARGV.first:\n\nprint_a_line(open(ARGV.first))\nprint_a_line(open(ARGV.first))\nprint_a_line(open(ARGV.first))\n\n\nThen f.gets does not track to the new line and remains on line 1:\n\nThis is line 1\nThis is line 1\nThis is line 1\n\n\nAnd the same even with input_file:\n\nprint_a_line(open(input_file))\nprint_a_line(open(input_file))\nprint_a_line(open(input_file))\n\n\nf.get still doesn\'t track to the next line:\n\nThis is line 1\nThis is line 1\nThis is line 1\n\n\nObviously, I would declare and use variables -- I understand the basics of writing neat, readable code.\n\nMy question is why does f.get track to the next line when the function is called with a declared variable and not track to the next line when called with the open(ARGV.first) or open(input_file)?\n\nWhy do I have to declare the variable again?\n\ncurrent_file = open(input_file)\n\n    ',
    title:
      "RUBY: Why does open(ARGV.first) in a function not move to the next line in subsequent runs?",
    id: 347,
    PostTypeId: 1,
    bounty: 0.5327862585034082,
    UserId: 68,
    viewCount: 9,
    upvoteCount: 33,
    comments: 0
  },
  {
    body:
      "\n\nI want the flex items to be centered but when we have a second line, to have 5 (from image below) under 1 and not centered in the parent.\n\n\n\nHere's an example of what I have:\n\n\n\nul {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n}\nli {\n  list-style-type: none;\n  border: 1px solid gray;\n  margin: 15px;\n  padding: 5px;\n  width: 200px;\n}\n<ul>\n  <li>1</li>\n  <li>2</li>\n  <li>3</li>\n  <li>4</li>\n  <li>5</li>\n  <li>6</li>\n</ul>\n\n\n\n\nhttp://jsfiddle.net/8jqbjese/2/\n    ",
    title: "Center wrapper, but have the tiles flex-start",
    id: 348,
    PostTypeId: 1,
    bounty: 0.3818777130495239,
    UserId: 59,
    viewCount: 2,
    upvoteCount: 39,
    comments: 1
  },
  {
    body:
      "\nFlexbox Challenge & Limitation\n\nThe challenge is to center a group of flex items and left-align them on wrap. But unless there is a fixed number of boxes per row, and each box is fixed-width, this is currently not possible with flexbox.\n\nUsing the code posted in the question, we could create a new flex container that wraps the current flex container (ul), which would allow us to center the ul with justify-content: center. \n\nThen the flex items of the ul could be left-aligned with justify-content: flex-start.\n\n#container {\n    display: flex;\n    justify-content: center;\n}\n\nul {\n    display: flex;\n    justify-content: flex-start;\n}\n\n\nThis creates a centered group of left-aligned flex items.\n\nThe problem with this method is that at certain screen sizes there will be a gap on the right of the ul, making it no longer appear centered.\n\n\n\n\nThis happens because in flex layout (and, actually, CSS in general) the container:\n\n\ndoesn't know when an element wraps;\ndoesn't know that a previously occupied space is now empty, and\ndoesn't recalculate its width to shrink-wrap the narrower layout.\n\n\nThe maximum length of the whitespace on the right is the length of the flex item that the container was expecting to be there.\n\nIn the following demo, by re-sizing the window horizontally, you can see the whitespace come and go.\n\nDEMO\n\n\n\nA More Practical Approach\n\nThe desired layout can be achieved without flexbox using inline-block and  media queries.\n\nHTML\n\n<ul>\n    <li>1</li>\n    <li>2</li>\n    <li>3</li>\n    <li>4</li>\n    <li>5</li>\n    <li>6</li>\n</ul>\n\n\nCSS\n\nul {\n    margin: 0 auto;                  /* center container */\n    width: 1200px;\n    padding-left: 0;                 /* remove list padding */\n    font-size: 0;                    /* remove inline-block white space;\n                                        see https://stackoverflow.com/a/32801275/3597276 */\n}\n\nli {\n    display: inline-block;\n    font-size: 18px;                 /* restore font size removed in container */\n    list-style-type: none;\n    width: 150px;\n    height: 50px;\n    line-height: 50px;\n    margin: 15px 25px;\n    box-sizing: border-box;\n    text-align: center;\n}\n\n@media screen and (max-width: 430px) { ul { width: 200px; } }\n@media screen and (min-width: 431px) and (max-width: 630px) { ul { width: 400px; } }\n@media screen and (min-width: 631px) and (max-width: 830px) { ul { width:600px;  } }\n@media screen and (min-width: 831px) and (max-width: 1030px) { ul { width: 800px; } }\n@media screen and (min-width: 1031px) and (max-width: 1230px) { ul { width: 1000px; } }\n\n\nThe above code renders a horizontally-centered container with left-aligned child elements like this:\n\n\n\nDEMO\n\n\n\nOther Options\n\n\nProperly sizing and aligning the flex item(s) on the last row\nDesandro Masonry\n\n\n  Masonry is a JavaScript grid layout library. It\n  works by placing elements in optimal position based on available\n  vertical space, sort of like a mason fitting stones in a wall. You’ve\n  probably seen it in use all over the Internet.\n  \n  source: http://masonry.desandro.com/\n\nCSS Grid Layout Module Level 1\n\n\n  This CSS module defines a two-dimensional grid-based layout system, optimized for user interface design. In the grid layout model, the children of a grid container can be positioned into arbitrary slots in a predefined flexible or fixed-size layout grid.\n  \n  source: https://drafts.csswg.org/css-grid/\n\n\n    ",
    id: 349,
    PostTypeId: 2,
    PostId: 348,
    bounty: 0.3818777130495239,
    UserId: 66,
    upvoteCount: 14
  },
  {
    body:
      "\n\nI have been working with Parse for some time now with great success.  Recently, I had an issue that pushed me to move to the latest cdn-based javascript API.  Immediately after changing my parse API version (via cdn), I started getting this error, having to do with a simple query.limit(n) setting I have in my code.  \n\nHere is the error I am getting:\n\nUncaught Error: You can only set the limit to a numeric value\nat ParseQuery.limit (parse-latest.js:6704)\nat ParseTable.render (ParseTable.js:199)\nat ParseTable (ParseTable.js:52)\nat HTMLDocument.<anonymous> (players.php:137)\nat l (jquery-1.8.3.min.js:2)\nat Object.fireWith [as resolveWith] (jquery-1.8.3.min.js:2)\nat Function.ready (jquery-1.8.3.min.js:2)\nat HTMLDocument.A (jquery-1.8.3.min.js:2)\n\n\nSee ParseTable.js:199 below - Again, this line has worked for months and only went berzerk after the API swapout.\n\n},\n            render: function(){\n                this.spin(true);\n                if(!this.DOM){\n                    this.init(); // ONE TIME CALL\n                }\n\n                this.query.startsWith(this.opts.searchColumn, input)\n                this.query.equalTo(this.opts.primaryKeyCloudColumn, this.opts.username)\n                alert(this.pageSize);             <--- this returns 10  -----------\n                this.query.limit(this.pageSize)   <--- this is line 199 ----\n\n                if(this.page>1)\n                    this.query.skip((this.pageSize*this.page)-this.pageSize)\n                else \n                    this.query.skip(0) // unsetting skip\n\n                if(this.sortBy)\n                    if(this.sortOrder==='ascending')\n                        this.query.ascending(this.sortBy)\n                    else \n                        this.query.descending(this.sortBy)\n\n                this.query.find({\n\n                    success: function(results) {\n\n                        if(!results.length){\n\n\nAny ideas appreciated!\n    ",
    title:
      "trying to set query.limit(varname) and getting error saying that the &#39;limit&#39; can only be set to a numeric",
    id: 350,
    PostTypeId: 1,
    bounty: 0.4914672024918021,
    UserId: 22,
    viewCount: 7,
    upvoteCount: 16,
    comments: 1
  },
  {
    body:
      "\nI found that, for some reason, my query.limit(n) value was being received by the called API function as a character string.\n\nI fixed it by using the following -\n\n    this.query.limit(Number(this.pageSize));\n\n\nWorking fine again.\n    ",
    id: 351,
    PostTypeId: 2,
    PostId: 350,
    bounty: 0.4914672024918021,
    UserId: 43,
    upvoteCount: 31
  },
  {
    body:
      "\n\nIs it possible to continue receiving socket messages after the host has stopped sending? Our client seems to be looping the socket messages (getting the same one over and over again) even though the host has not sent those messages. The client will get 1000's of messages, while the host has not sent that many.\n    ",
    title: "Multiple client socket messages",
    id: 352,
    PostTypeId: 1,
    bounty: 0.6453532378556488,
    UserId: 17,
    viewCount: 5,
    upvoteCount: 25,
    comments: 2
  },
  {
    body:
      "\nIn my experience, this cant really happen. So as the commenters said, a bug in the client or the server is highly likely. \n\nI'd suggest using wireshark to sniff what happens on the wire.\n\nIf the data is actually seen on the wire multiple times, then review your server code. Otherwise have a look at the client. If your programs run on normal windows/linux/mac computers, you can do the sniffing directly on one of those machines.\n    ",
    id: 353,
    PostTypeId: 2,
    PostId: 352,
    bounty: 0.6453532378556488,
    UserId: 81,
    upvoteCount: 5
  },
  {
    body:
      "\n\n  Is it possible to continue receiving socket messages after the host has stopped sending?\n\n\nNo.\n\n\n  Our client seems to be looping the socket messages (getting the same one over and over again)\n\n\nIn other words it is ignoring the return code of recv() or whatever API it is using to read, so it keeps reusing the same buffer contents even after end of file or a terminal error.\n\n\n  even though the host has not sent those messages. The client will get 1000's of messages, while the host has not sent that many.\n\n\nThe client won't receive even one excess message, but there are plenty of ways in which it can buggily print excess messages.\n    ",
    id: 354,
    PostTypeId: 2,
    PostId: 352,
    bounty: 0.6453532378556488,
    UserId: 42,
    upvoteCount: 37
  },
  {
    body:
      '\n\nSo I have a method in my controller that performs an inster. Currently this method is working fine in the controller, but I am having difficulty getting the same functionality in my JUnit, and with my test database. I know there\'s some configuration that I\'m missing somewhere. \n\nHere\'s how I have my test class set up. \n\n    import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;\n    import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;\n    import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;\n    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;\n    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;\n    import static org.hamcrest.Matchers.*;\n    import static org.junit.Assert.*;\n\n    import javax.persistence.EntityManager;\n    import javax.persistence.PersistenceContext;\n\n    import org.junit.Before;\n    import org.junit.BeforeClass;\n    import org.junit.Test;\n    import org.junit.runner.RunWith;\n    import org.slf4j.Logger;\n    import org.slf4j.LoggerFactory;\n    import org.springframework.beans.factory.annotation.Autowired;\n    import org.springframework.boot.test.context.SpringBootTest;\n    import org.springframework.http.MediaType;\n    import org.springframework.test.context.TestExecutionListeners;\n    import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;\n    import org.springframework.test.context.junit4.SpringRunner;\n    import org.springframework.test.web.servlet.MockMvc;\n    import org.springframework.transaction.annotation.Transactional;\n    import org.springframework.web.context.WebApplicationContext;\n\n    import com.bdc.am.repositories.ClientRepository;\n    import com.bdc.am.repositories.ContractRepository;\n\n    import org.springframework.test.context.transaction.TransactionalTestExecutionListener;\n\n\n\n    @RunWith(SpringRunner.class)\n    @SpringBootTest\n    @TestExecutionListeners({TransactionalTestExecutionListener.class})\n // I\'ve heard that this Listener allows me to use Transactions in my test class, but so far it hasn\'t worked for me. \n    public class DbcAmServiceTest extends AbstractTransactionalJUnit4SpringContextTests {\n\n        private static Logger LOGGER = LoggerFactory.getLogger(DbcAmServiceTest .class);\n\n        private MockMvc mockMvc;\n\n        @Autowired\n        private WebApplicationContext webApplicationContext;\n\n        @Autowired\n        ClientRepository ClientRepo;\n\n        @Autowired\n        ContractRepository ContractRepo;\n\n        @PersistenceContext \n        EntityManager em;\n\n        @BeforeClass\n        public static void beforeClass() throws Exception{\n            //set the system property to test so that the test database is used\n            System.setProperty("ENVNAME","JUNIT");\n\n        }\n        @Before\n        public void setup() throws Exception {\n        this.mockMvc = webAppContextSetup(webApplicationContext).build();\n}\n\n\nSkipping tests which are fine, then the actual method within my test class which is giving me trouble: \n\n    @Test\n    @Transactional(rollbackFor = Exception.class)\n    public void testUpdateandInsert(){\n\n        LOGGER.info("==============Starting updateAndInstertTest================");\n\n        try{\n\n            int beforeUpdate = super.countRowsInTable("test_database");\n//^This handy method allows me to count the rows in the database before performing the update\n\n\n\n            String json = "{\\"contractNum\\":\\"123456\\",\\"clientNum\\":\\"123456\\",\\"action\\":\\"update",\\"State\\":\\"NY\\"," +\n                    "\\"City\\":\\"New York",\\"changeDate\\":\\"08/30/2016 11:35:59\\"}";\n\n            this.mockMvc.perform(post("/am/updateAmContract").contentType(MediaType.APPLICATION_JSON).content(json))\n            .andDo(print())\n            .andExpect(status().isOk())\n            .andExpect(jsonPath("$.status").value("Success"))\n            .andExpect(jsonPath("$.statusMessage").value("Success"));\n\n            int afterUpdate = super.countRowsInTable("test_database");\n            assertEquals(beforeUpdate + 1, afterUpdate);\n//ideally I should be able to query again and see that one extra row has been inserted, but at the moment both these checks return 7. \n\n\nSo essentially, while I can get @Transaction annotation to work in my main controller method, there seems to be something entirely different I\'d need to do to update my in-memory test database. Any ideas on how to permit this to happen? Thanks everyone.\n    ',
    title: "Testing with Spring JPA + Mock Database + @Transactional + JUnit",
    id: 355,
    PostTypeId: 1,
    bounty: 0.3295401558865356,
    UserId: 60,
    viewCount: 1,
    upvoteCount: 17,
    comments: 0
  },
  {
    body:
      '\n\nWe are running an Asp.NET Core Website in VS 2015 Update 3 our DB code is Async ADO.NET methods connecting to a SQL Server 10.50.1600.1 DB.\n\nWe are getting a strange DB authentication error when connecting to our DB.  The first time we run the web site everything works fine DB calls work perfectly.  Subsequent restarts also work fine as long as no website code is changed and needs recompiling such as making a change to a WebApi controller.  If this happens we get the error below and the only way to connect to the DB again is to restart the whole computer.  Restarting VS makes no difference.  We are using Kestrel not IIS.  This is driving us nuts we have to restart our machines several times a day. Would appreciate any suggestions!\n\n\n  {"A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: Named Pipes Provider, error: 40 - Could not open a connection to SQL Server)"}\n\n    ',
    title:
      "DB Connection Error in ASP.NET Core WebSite after initial Successful Connection",
    id: 356,
    PostTypeId: 1,
    bounty: 0.7970912987859686,
    UserId: 78,
    viewCount: 7,
    upvoteCount: 38,
    comments: 0
  },
  {
    body:
      '\n\nI have a SAS program that dynamically generates another SAS program (don\'t ask why) like this:\n\ndata _null_;file="myFile.sas";x = "%nrstr(my sas code)";put x;run;\n\n\nI have an edge case where my code looks like this:\n\n"%nrstr(%myMacro(something,)" || "&macroVariable);";\n\n\nThe issue is that the first ) is closing %myMacro even though I really want it to close %nrstr so instead of printing %myMacro(something,*valueOfMacroVariable); it prints %myMacro(something,)*valueOfMacroVariable); which won\'t work. \n\nProblem is that macrovariables don\'t resolve inside of %nrstr, but if I don\'t wrap with %nrstr it evaluates when I put rather than printing to the file. What I want is x = "%myMacro(something,&macroVariable);", but like I said this doesn\'t print to new program, this just runs the macro, which I don\'t want. \n\nIs there a way for me to escape ( in my %nrstr so that it treats it as an arbitrary character and doesn\'t try to pair it up with the corresponding ) so that the ) can be used to close the %nrstr instead?\n\nKind Regards\n    ',
    title: "Dealing with parenthesis in quotes in SAS",
    id: 357,
    PostTypeId: 1,
    bounty: 0.012835776330611948,
    UserId: 79,
    viewCount: 8,
    upvoteCount: 1,
    comments: 2
  },
  {
    body:
      "\nYou only need to have the %NRTSTR() macro quoting around the string that you want quoted, in this case the macro name.  Plus do not use double quotes unless you want to expand macro variables or macro calls.  So if you don't want either the macro call or the macro variable reference to execute until later (perhaps you are pushing them onto the stack using CALL EXECUTE) then you could build you string like this.\n\n'%nrstr(%myMacro)' || '(something,' || '%nrstr(&macroVariable)' || ');' \n\n\nIf you did want the macro reference to run now, but not the macro call then you probably want something like this:\n\n'%nrstr(%myMacro)' || '(something,' || \"&macroVariable\" || ');' \n\n    ",
    id: 358,
    PostTypeId: 2,
    PostId: 357,
    bounty: 0.012835776330611948,
    UserId: 15,
    upvoteCount: 9
  },
  {
    body:
      "\n% is how you escape things inside macro quoting functions.\n\nSo this would work:\n\ndata _null_;\n  x=\"%nrstr(%myMacro%(something,)\" || '&macroVariable);';\n  put x=;\nrun;\n\n\nNote the % before the parenthesis.\n\nIf you're constructing this from data, though (as you hopefully are) there may be better options depending on how you're doing so.\n    ",
    id: 359,
    PostTypeId: 2,
    PostId: 357,
    bounty: 0.012835776330611948,
    UserId: 9,
    upvoteCount: 8
  },
  {
    body:
      "\n\nGiven the following method:\n\n- (void)sendEvent:(UIEvent *)event\n{\n    NSSet *allTouches = [event allTouches];\n\n    if ([allTouches count] > 0)\n    {\n        _lastUserTouchTime = [[NSDate date] timeIntervalSince1970];\n    }\n\n    [super sendEvent:event];\n}\n\n\nThe [event allTouches] generates the following inspection warning in AppCode 2016.3.\n\n\n  \"Method 'allTouches' is defined in class 'UIEvent' and is not visible\"\n\n\nallTouches is defined in <UIKit/UIEvent.h> which I've tried including to no effect. Xcode doesn't seem to have any issue with this bit of code. Anyone have insight on this?\n    ",
    title:
      "What causes &quot;Method &#39;foo&#39; is defined in class &#39;Bar&#39; and is not visible&quot; in AppCode",
    id: 360,
    PostTypeId: 1,
    bounty: 0.11987018091636759,
    UserId: 98,
    viewCount: 9,
    upvoteCount: 2,
    comments: 1
  },
  {
    body:
      "\nThats because allTouches is defined as property\n\nLook at this code:\n\nNS_CLASS_AVAILABLE_IOS(2_0) @interface UIEvent : NSObject\n...\n#if UIKIT_DEFINE_AS_PROPERTIES\n@property(nonatomic, readonly, nullable) NSSet <UITouch *> *allTouches;\n#else\n- (nullable NSSet <UITouch *> *)allTouches;\n#endif\n...\n@end\n\n\nLater versions of iOS SDK uses properties rather than methods. And, AppCode has more strict type-checks than Xcode. That's why Xcode silently compiles and AppCode gives warnings\n    ",
    id: 361,
    PostTypeId: 2,
    PostId: 360,
    bounty: 0.11987018091636759,
    UserId: 70,
    upvoteCount: 19
  },
  {
    body:
      "\n\nI'm new to docker, am trying to pass the local hostname ($Hostname) into docker container and change an entry of configuration file in a container with the new $Hostname. \n\nI added a command in dockerfile as below:\n\nRUN echo $Hostname >> /etc/***.config\n\n\nand running docker from image \n\nrun -e $Hosname='cat /etc/hostname' ...\n\nHowever, the $Hostname in the container is container's hostname instead of local host's. Can anyone help me with this? Thanks a lot!\n    ",
    title:
      "How to pass parameter into docker container and update file in container with passed parameter",
    id: 362,
    PostTypeId: 1,
    bounty: 0.11562533772478067,
    UserId: 82,
    viewCount: 7,
    upvoteCount: 7,
    comments: 2
  },
  {
    body:
      "\nThe hostname of the container is actually one of the few things you can't change using normal methods. This is because the docker engine needs to know it's controlling this in order to handle linking and networks.\n\nTo set the hostname in a way that docker engine respects, do this:\n\ndocker run --hostname myhostname imagename\n\n\nThe Network Settings section in the docs explain how this works\n    ",
    id: 363,
    PostTypeId: 2,
    PostId: 362,
    bounty: 0.11562533772478067,
    UserId: 82,
    upvoteCount: 32
  },
  {
    body:
      "\nGenerally speaking; the -e flag sets the specified environment variable at invocation time.\n\nTry this instead:\n\ndocker run -e PARENT_HOSTNAME=${HOSTNAME} ...\n\n\n(see @code_monk's answer for the specifics about setting the containers hostname to the same as the docker host)\n\nI don't think you usually need or want the docker host hostname in the container, but that will set the environment variable in the container.\n    ",
    id: 364,
    PostTypeId: 2,
    PostId: 362,
    bounty: 0.11562533772478067,
    UserId: 26,
    upvoteCount: 6
  },
  {
    body:
      "\n\nI use jquery post() to update a database record. Then a get() from the same function to display the updated record to a div. However the get() still returns the old record. I have tried load() but still get the same results.\n\nfunction update_RecordDetails() {\n    $.post(\"_assets/update_RecordDetails.asp\", {\n        recorddetailid:  $('#recorddetailid').val(),\n        findings: $('#findings').val()\n    },\n    function(data, status){\n        $(\"#alert\").html(data);\n    });\n    $.get('_assets/execute_RecordDetails.asp?recordid=' + $('#recordid').val(), function(result) {\n        $('#treatments_div').val(result);\n    });             \n}\n\n    ",
    title: "After Record Update still Displaying Old Record",
    id: 365,
    PostTypeId: 1,
    bounty: 0.6989408652511877,
    UserId: 67,
    viewCount: 2,
    upvoteCount: 24,
    comments: 0
  },
  {
    body:
      "\n\nI'm trying to reproduce similar thing as in On Windows, how to open for writing a file already opened for writing by another process?\nso I followed the answer by Piotr Dobrogost, modyfing the code from Using a struct as a function argument with the python ctypes module, changing the flags and attributes to my purposes (taken from here https://msdn.microsoft.com/en-us/library/windows/desktop/aa363858(v=vs.85).aspx and here http://unix.superglobalmegacorp.com/Net2/newsrc/sys/fcntl.h.html) and adding the Python (using 3.3 version) open function:\n    from os import path\n    from ctypes import *\n    from ctypes.wintypes import *\n\nGENERIC_READ = 0x80000000\nGENERIC_WRITE = 0x40000000\n\nFILE_SHARE_DELETE = 0x00000004\nFILE_SHARE_READ = 0x00000001\nFILE_SHARE_WRITE = 0x00000002\nFILE_SHARE_READ_WRITE = (FILE_SHARE_READ | FILE_SHARE_WRITE)\n\nOPEN_EXISTING = 3\n\nFILE_ATTRIBUTE_NORMAL = 128\nFILE_ATTRIBUTE_TEMPORARY = 256\n\nO_RDONLY =  0x0000      # open for reading only \nO_WRONLY = 0x0001       # open for writing only \nO_RDWR = 0x0002     # open for reading and writing \nO_ACCMODE = 0x0003      # mask for above modes \nO_APPEND = 0x0008       # set append mode \n\nINVALID_HANDLE_VALUE = -1\nLPOVERLAPPED = c_void_p\nLPSECURITY_ATTRIBUTES = c_void_p\n\nNULL = 0\nFALSE = BOOL(0)\nTRUE = BOOL(1)\n\ndef CreateFile(filename, access, sharemode, creation, flags):\n    return HANDLE(windll.kernel32.CreateFileW(\n        LPWSTR(filename),\n        DWORD(access),\n        DWORD(sharemode),\n        LPSECURITY_ATTRIBUTES(NULL),\n        DWORD(creation),\n        DWORD(flags),\n        HANDLE(NULL)\n    ))\n\n\ndef translate_path(fpath):\n    fpath = path.abspath(fpath)\n    if fpath[len(fpath)-1] == '\\\\' and fpath[len(fpath)-2] == ':':\n        fpath = fpath[:len(fpath)-1]\n    return '\\\\??\\\\%s' % fpath\n\nlink_name = 'G:\\\\MATLAB\\\\Chronos_Python\\\\test.txt'\nlink_name = path.abspath(link_name)\n\nhFile = CreateFile(link_name, GENERIC_READ, FILE_SHARE_WRITE, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL)\n\nif hFile == HANDLE(INVALID_HANDLE_VALUE):\n   raise Exception('Failed to open directory for junction creation.')\n\ncFile = ctypes.cdll.msvcrt._open_osfhandle(hFile,O_RDONLY)\npyFile = open(cFile,'r')\npyFile.read()\npyFile.close()\nctypes.cdll.msvcrt._close(cFile)\n\nwindll.kernel32.CloseHandle(hFile)\n\n\nbut at the line pyFile = open(cFile,'r') I get \n\n\n  OSError: [Errno 9] Bad file descriptor\n\n\nIt might be something very basic, since I am a newbie to python...\nI'd very much appreciate if someone could help me fix it. \n    ",
    title: "In Python, how to pass ctypes file descriptor to open a file?",
    id: 366,
    PostTypeId: 1,
    bounty: 0.3482592561149427,
    UserId: 58,
    viewCount: 7,
    upvoteCount: 19,
    comments: 1
  },
  {
    body:
      "\nAssuming the handle to the file was properly generated, I think your issue might be here:\n\npyFile = open(cFile,'r')\n\n\nYou're trying to open a C run-time file descriptor, so you'll need to use the fdopen function in python:\n\npyFile = os.fdopen(cFile, 'r')\n\n\nYou might want to look at the documentation here - python exposes some of the msvcrt functions through the standard library on Windows:\nhttps://docs.python.org/3.6/library/msvcrt.html#msvcrt.open_osfhandle\n    ",
    id: 367,
    PostTypeId: 2,
    PostId: 366,
    bounty: 0.3482592561149427,
    UserId: 59,
    upvoteCount: 14
  },
  {
    body:
      "\n\nI have a query that I need to get a total count of before I paginate. I was wondering if there was a way to return the total count within the same query before the limit is executed. I have to pass the total value to my back-end if thats possible.\n\nWhat the query does-\n-Finds rows that have are within a specified radius,\n-that match a user entered keyword,\n-orders by date then limit,\n-offset for pagination.  \n\nSELECT *,   \n( 3959 * acos (cos ( radians(?) )* cos( radians( lat ) )*cos( radians( lng ) - radians(?) )+ sin ( radians(?) )* sin( radians( lat ) ))) AS distance   \n  FROM job_posting  \n where job_title like ?  \n HAVING distance < ?   \nORDER BY date_created DESC   \nlimit ?, 25  \n\n\nI've looked at a couple different examples, but not sure how to implement it on this query. Any advice helps. \n    ",
    title: "How to get total count of this query without calling another one?",
    id: 368,
    PostTypeId: 1,
    bounty: 0.2563056327563069,
    UserId: 43,
    viewCount: 1,
    upvoteCount: 9,
    comments: 2
  },
  {
    body:
      "\nNot efficiently, and not particularly gracefully. Counting all items that match criteria is a different enough operation from retrieving a certain chunk of rows that there's little to be gained by combining them.\n\nLogically, any single statement that returned both the rows and the total rowcount would in fact comprise two queries clumsily mashed together, and the count would be appended to each and every row when you only need it once. You could do it by JOINing in the SELECT COUNT... as a subquery ON TRUE, but you're likely better off factoring out pagination logic in your backend to run the count and retrieval queries, especially if it's a common need in your application.\n    ",
    id: 369,
    PostTypeId: 2,
    PostId: 368,
    bounty: 0.2563056327563069,
    UserId: 21,
    upvoteCount: 34
  },
  {
    body:
      "\nTechnically it is possible to this using sql_calc_found_rows modifier in the select statement and then retrieving the count with found_rows() function.\n\nSELECT sql_calc_found_rows *,   \n( 3959 * acos (cos ( radians(?) )* cos( radians( lat ) )*cos( radians( lng ) - radians(?) )+ sin ( radians(?) )* sin( radians( lat ) ))) AS distance   \n  FROM job_posting  \n where job_title like ?  \n HAVING distance < ?   \nORDER BY date_created DESC   \nlimit ?, 25;\n\nselect found_rows();\n\n\nHowever, as this excellent SO topic discusses, most of the time it is faster to execute another select count(*)... query.\n\nDo test both ways and use whichever is faster for you.\n    ",
    id: 370,
    PostTypeId: 2,
    PostId: 368,
    bounty: 0.2563056327563069,
    UserId: 89,
    upvoteCount: 2
  },
  {
    body:
      "\n\nI have a very simple API call that deletes a resource.  On the front end:\n\n  o.destroy = function (unit_id, alarm, index) {\n  return $http.delete('/api/alarms', alarm).then(function (data) {\n    console.log('success');\n  }, function(err){\n    console.log(err);\n  });\n};\n\n\nAnd on the backend\n\nexports.destroy_alarm =  function(req, res, next) {\n TimeSeriesAlarm.findOneAndRemove({id: req.body._id},\n   function(err, result){\n    res.status(201).json([]);\n  });\n};\n\n\nThe server logs a successful API request, and the resource gets deleted.  However, I have to make the call between 5-10 times before I get back a successful request on the front end.  Usually I get this:\n\nObject\nconfig\n:\nObject\ndata:null\nheaders:(d)\nstatus:-1\nstatusText\n:\n\"\"\n\n\nAngular documentation says \"-1 usually means the request was aborted, e.g. using a config.timeout\"  However that's not the case.  The resource is delete successfully every time, it's just the status that's wrong.\n    ",
    title:
      "Why is $http indicating an error when the backend indicates success?",
    id: 371,
    PostTypeId: 1,
    bounty: 0.16131723139233922,
    UserId: 92,
    viewCount: 5,
    upvoteCount: 20,
    comments: 0
  },
  {
    body:
      '\n\nI have a button that I want to use to add data to a list. I have managed to get it working when I hard code the div that I want it to go to, but I have multiple buttons to update different divs. I want to use DRY code, so am trying to make each button only update its sibling.\n\nHTML\n\n<div class="box">\n  <a class="btn" href="#">Export</a>\n  <div class="title">\n      EXPORT LOG\n  </div>\n  <div class="content">\n      <ul class="box-list">\n          <li>Text</li>\n          <li>Text</li>\n          <li>Text</li>\n          <li>Text</li>\n      </ul>\n   </div>\n</div>\n\n\njQuery (the commented out code updates all divs, not just siblings)\n\n$(".btn").click(function() {\n     $(\'<li>added text</li><li>more added text</li>\').prependTo().parent().find(".box-list");\n\n     // $(\'<li>added text</li><li>more added text</li>\').prependTo(".box-list")\n});\n\n    ',
    title: "jQuery - press button to add data to sibling",
    id: 372,
    PostTypeId: 1,
    bounty: 0.03914857136820338,
    UserId: 29,
    viewCount: 4,
    upvoteCount: 35,
    comments: 3
  },
  {
    body:
      '\nWithin the jQuery function you can reference $(this) which will be the particular .btn that was clicked.\n\nSomething like:\n\n$(".btn").click(function() {\n  $(this).parent().find(".box-list").prepend(\'<li>added text</li><li>more added text</li>\')\n\n    ',
    id: 373,
    PostTypeId: 2,
    PostId: 372,
    bounty: 0.03914857136820338,
    UserId: 46,
    upvoteCount: 31
  },
  {
    body:
      '\nAre you looking for something like this:\nhttp://codepen.io/anon/pen/qqYmBj\n\nWhat I did was update your anchor tag to a div tag (just to remove the styling) and adding some CSS. I also broke out your code to make it more readable.\n\n$(".btn").click(function() {\n  myBox = $ (this).parent().find(\'.box-list\'); #Finds parent element of the btn and then finds the .box-list element from that parent element.\n  newEl = $ ("<li>Added text</li><li>More Added text</li>"); #New element(s) to add\n  newEl.appendTo(myBox);#Adds to the box\n});\n\n    ',
    id: 374,
    PostTypeId: 2,
    PostId: 372,
    bounty: 0.03914857136820338,
    UserId: 36,
    upvoteCount: 8
  },
  {
    body:
      '\nOr, you can add a little bit more logic to the HTML, and use that to make sure you will always hit the correct list.\n\n\n\n$(".btn").click(function() {\n   var containerID = $(this).attr(\'rel\');\n  $(\'<li>added \'+containerID+\' text</li>\').prependTo(\'#\'+containerID+\' .box-list\');\n//     $(\'<li>added text</li><li>more added text</li>\').prependTo(".box-list");\n\n     // $(\'<li>added text</li><li>more added text</li>\').prependTo(".box-list")\n});\n<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>\n<div class="box">\n  <a class="btn" rel="export" href="#">Export</a>\n  <a class="btn" rel="import" href="#">Import</a>\n  <div class="content" id="export">\n    <h2>Export log</h2>\n      <ul class="box-list">\n          <li>Text</li>\n          <li>Text</li>\n          <li>Text</li>\n          <li>Text</li>\n      </ul>\n   </div>\n  <div class="content" id="import">\n    <h2>Import log</h2>\n      <ul class="box-list">\n          <li>Text</li>\n          <li>Text</li>\n          <li>Text</li>\n          <li>Text</li>\n      </ul>\n   </div>\n</div>\n\n\n\n    ',
    id: 375,
    PostTypeId: 2,
    PostId: 372,
    bounty: 0.03914857136820338,
    UserId: 54,
    upvoteCount: 19
  },
  {
    body:
      "\n\nOn my linux server i have following .htaccess:\n\nOptions FollowSymLinks\nRewriteEngine On\nRewriteRule ^page/([^-]*)/([^-]*)$ index.php?module1=page&module2=$1&$2 [L]\nRewriteRule ^page/([^-]*)$ index.php?module1=page&module2=$1 [L]\nRewriteRule ^game/([^-]*)/([^-]*)$ index.php?module1=game&module2=$1&$2 [L]\nRewriteRule ^game/([^-]*)$ index.php?module1=game&module2=$1 [L]\nRewriteRule ^admin/([^-]*)/([^-]*)$ index.php?module1=admin&module2=$1&$2 [L]\nRewriteRule ^admin/([^-]*)$ index.php?module1=admin&module2=$1 [L]\n\n\nNow i want to set it on my windows 7. I am using WebServ as server (it's build on top of apache2).\n\nIf i copy paste this .htaccess then it ends up in http error 500 \n\nI have to comment Options FollowSymlinks to make it work.\nBut rewriting is still not working at all.\nI've tried:\n\n\nchanging all\n\nAllowOverride xxx to AllowOverride All in apache2/conf/httpd.conf\nin the same file i have: \n\nLoadModule rewrite_module modules/mod_rewrite.so (without comment)\n\n\nSo the questions are:\n1. Why Options FollowSymLinks ends in http error 500\n2. Why rewriting dont work?\n\nBest wishes\n    ",
    title: "Windows Apache .htaccess RewriteRule error",
    id: 376,
    PostTypeId: 1,
    bounty: 0.30750416234569267,
    UserId: 26,
    viewCount: 7,
    upvoteCount: 8,
    comments: 1
  },
  {
    body:
      "\nDebugging is hard.  Debugging is so much harder when you don't have enough facts.  You need more facts.  Not imaginary facts, real ones.  To get more real facts, turn on logging.  If running Apache 2.4, see this.  Do something like this:\n\nLogLevel alert rewrite:trace3\n\n\nGo read the log and it will tell you in detail what Rewrite is doing.  If there's not enough detail, bump it up to trace6.  My experience is that 500's are often (not always) caused by infinite looping.  Good luck!\n    ",
    id: 377,
    PostTypeId: 2,
    PostId: 376,
    bounty: 0.30750416234569267,
    UserId: 36,
    upvoteCount: 39
  },
  {
    body:
      "\n\nWhat is the best way to handle hovers in styled-components. I have a wrapping element that when hovered will reveal a button.\n\nI could implement some state on the component and toggle a property on hover but was wondering if there is a better way to do this with styled-cmponents.\n\nSomething like the following doesn't work but would be ideal:\n\nconst Wrapper = styled.div`\n  border-radius: 0.25rem;\n  overflow: hidden;\n  box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.25);\n  &:not(:last-child) {\n    margin-bottom: 2rem;\n  }\n  &:hover {\n    .button {\n      display: none;\n    }\n  }\n`\n\n    ",
    title: "Target another styled component on hover",
    id: 378,
    PostTypeId: 1,
    bounty: 0.6248893756018421,
    UserId: 70,
    viewCount: 2,
    upvoteCount: 34,
    comments: 1
  },
  {
    body:
      "\nAs of styled-components v2 you can interpolate other styled components to refer to their automatically generated class names. In your case you'll probably want to do something like this:\n\nconst Wrapper = styled.div`\n  &:hover ${Button} {\n    display: none;\n  }\n`\n\n\nSee the documentation for more information!\n\n\n\nIf you're using v1 and you need to do this you can work around it by using a custom class name:\n\nconst Wrapper = styled.div`\n  &:hover .my__unique__button__class-asdf123 {\n    display: none;\n  }\n`\n\n<Wrapper>\n  <Button className=\"my__unique__button__class-asdf123\" />\n</Wrapper>\n\n\nSince v2 is a drop-in upgrade from v1 I'd recommend updating, but if that's not in the cards this is a fine workaround.\n    ",
    id: 379,
    PostTypeId: 2,
    PostId: 378,
    bounty: 0.6248893756018421,
    UserId: 3,
    upvoteCount: 10
  },
  {
    body:
      '\n\nGiven: prog.c with an entry point prog\n\nI normally do\n\ncl.exe /MD /LD /Fe"prog.dll" /Fo"prog" "prog.c" /link ext.lib\n\n\nor\n\ncl.exe /MD /Fo"prog.obj"\ncl.exe /MD /LD /Fe"prog.dll" "prog.obj" /link ext.lib\n\n\nin both cases the resulting prog.dll works fine.\n\nNow I did the following to get an asm file instead of the obj file:\n\ncl.exe /c /MD /Fa"prog"\n\n\nThis "works" so far, too. But I cannot figure out how to make a dll of this file.\n\nTried:\n\nml.exe /c /Cx /coff prog.asm\ncl.exe /MD /LD /Fe"prog.dll" "prog.obj" /link ext.lib\n\n\nResult: prog.dll without entry point prog\n\nTried again:\n\nml.exe /c /Cx /coff prog.asm\ncl.exe /MD /LD /Fe"prog.dll" "prog.obj" /link /entry:prog ext.lib\n\n\nResult: compiler warning about wrong entry point _prog not being stdcall with 12 byte arguments and a compiler error about unresolved symbol _memcpy.\n\nQuestion: Is there any way to compile the asm file which cl.exe generates by /Fa to a dll (preferably via cl.exe, if not possible with ml.exe)?\n    ',
    title: "Compile asm file with cl.exe to dll",
    id: 380,
    PostTypeId: 1,
    bounty: 0.17416304484641754,
    UserId: 56,
    viewCount: 3,
    upvoteCount: 21,
    comments: 2
  },
  {
    body:
      "\n\n  Is there any way to compile the asm file which cl.exe generates by /Fa to a dll (preferably via cl.exe, if not possible with ml.exe)?\n\n\nNo:\n\n\nThe C/C++ compiler (cl.exe) cannot assemble assembly-code input. It takes only C or C++ source code as input. The assembler is MASM (ml.exe).\nThe assembly-code output of cl.exe cannot, in general, be fed directly into MASM. In some cases, it is not even valid assembly code. In other cases, there are directives, keywords, and other things emitted in the code that MASM doesn't directly support. Things get especially hairy if the C/C++ source uses exceptions. The listing file is for informational purposes only.\n\n\nIt is very unclear to me why you are even wanting to do this in the first place. If your source code is either C or C++, and can be compiled and linked by MSVC, then what is the point of introducing the additional intermediate step of converting it to and from assembly language? Just use cl.exe directly to make a DLL.\n\nIf you absolutely must do this, you will have to take the ASM listing file generated by MSVC and manually clean it up before running it through MASM. You can make this clean-up task easier by turning off whole program optimization, turning off exception handling, turning off security checks/cookies, and indicating to the linker that the image does not contain safe SEH handlers. Note that some of these may break or change the behavior of your code! You'll also need to add EXTERN definitions for functions that you call from runtime libraries.\n    ",
    id: 381,
    PostTypeId: 2,
    PostId: 380,
    bounty: 0.17416304484641754,
    UserId: 64,
    upvoteCount: 38
  },
  {
    body:
      "\nWhile ASM source generated by the Microsoft C compiler might not be the best input back into MASM, that doesn't mean it won't work, at least in some cases (just maybe not complicated ones). If you look at an ASM file generated by the C compiler, you'll find someone at Microsoft went to a lot of trouble to insert various \"hacky\" includes, directives, manual segment definitions and other MASM specifics to give the source file at least a slim chance of being fed back into MASM and achieving an assembled result.  As long as you set your expectations low, I'd guess a simple C source file, converted to ASM and then fed back into MASM should work if you get your command lines options in order.\n\nOne caveat you need to keep in mind is that if you use the CRT like you are doing (i.e. the use of memcmp), you'll want to allow the default entrypoint ___DllMainCRTStartup@12 to be selected from the appropriate CRT .LIB file  rather than specifying your own.  This allows the CRT to be initialized before your DllMain is called, preventing a crash when you invoke certain CRT functions that depend on this initialization. With that said, older versions of Visual Studio, such as 7.1 (2003), you could get away with not initializing the CRT depending on the which functions you used without risking a crash.  The newer versions of the C Runtime will throw an exception no matter which CRT function is called if the process has not previously called mainCRTStarttup or DllMainCRTStartup.\n\nFor educational purposes, lets address the entrypoint problem you described above using MSVC 7.1 (2003) and we'll not worry about initializing the CRT so you can explicitly specify your own entrypoint.  I think you were hitting the following linker warning:\n\nwarning LNK4086: entrypoint '_prog@XX' is not __stdcall with 12 bytes of arguments; image may not run\n\n\nWhen specifying your own DLL entrypoint, the linker is expecting a DllMain signature (which is 12 argument bytes and stdcall, so the function clears the arguments itself); officially it is:\n\nBOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved)\n\n\nYou might implement the entrypoint function as shown in this version of prog.c:\n\n#include <Windows.h>\n#include <stdio.h>\n\n#pragma warning (disable:4100) //Warning Level 4: unreferenced formal parameter\n\nint __stdcall prog(DWORD hInst, DWORD dwReason, DWORD dwReserved)\n{\n    printf(\"Result of memcmp: %d\\n\",memcmp(\"foo\",\"bar\",3));\n    return(1);\n}\n\n\nAssuming your LIB and INCLUDE environment variables are properly set, you can build the source above with the commands:\n\ncl.exe /nologo /c /MD /Fa./prog.asm prog.c\nlink.exe /nologo /dll /subsystem:console /entry:prog prog.obj kernel32.lib\n\n\nYou already know you can build the original C source with the C compiler.\nFocusing on the prog.asm output file generated from the /Fa option, you can build the DLL from the generated ASM source as follows:\n\nml.exe /c /coff /Cx prog.asm\nlink.exe /nologo /dll /subsystem:console /entry:prog prog.obj kernel32.lib\n\n\nTest out your DLL using a simple console loader such as:\n\n#include <Windows.h>\nint __cdecl main(void)\n{\n    HMODULE hLib = LoadLibrary(\"prog.dll\");\n    printf(\"LoadLibrary result: 0x%X / code=0x%X\\n\",hLib,GetLastError());\n}\n\n\nOn my machine, both the C and MASM generated DLLs produced the following output:\n\nResult of memcmp: 1\nLoadLibrary result: 0x10000000 / code=0x0\nResult of memcmp: 1\n\n\nThe generated MSVC 7.1 ASM file produced by the compiler is listed below for reference.  Notice how the file refers to itself as a \"Listing\" :)\n\n; Listing generated by Microsoft (R) Optimizing Compiler Version 13.10.6030 \n\n    TITLE   prog.c\n    .386P\ninclude listing.inc\nif @Version gt 510\n.model FLAT\nelse\n_TEXT   SEGMENT PARA USE32 PUBLIC 'CODE'\n_TEXT   ENDS\n_DATA   SEGMENT DWORD USE32 PUBLIC 'DATA'\n_DATA   ENDS\nCONST   SEGMENT DWORD USE32 PUBLIC 'CONST'\nCONST   ENDS\n_BSS    SEGMENT DWORD USE32 PUBLIC 'BSS'\n_BSS    ENDS\n$$SYMBOLS   SEGMENT BYTE USE32 'DEBSYM'\n$$SYMBOLS   ENDS\n_TLS    SEGMENT DWORD USE32 PUBLIC 'TLS'\n_TLS    ENDS\nFLAT    GROUP _DATA, CONST, _BSS\n    ASSUME  CS: FLAT, DS: FLAT, SS: FLAT\nendif\n\nINCLUDELIB MSVCRT\nINCLUDELIB OLDNAMES\n\n_DATA   SEGMENT\n$SG74617 DB 'bar', 00H\n$SG74618 DB 'foo', 00H\n$SG74619 DB 'Result of memcmp: %d', 0aH, 00H\n_DATA   ENDS\nPUBLIC  _prog@12\nEXTRN   __imp__printf:NEAR\nEXTRN   _memcmp:NEAR\n; Function compile flags: /Odt\n_TEXT   SEGMENT\n_hInst$ = 8                     ; size = 4\n_dwReason$ = 12                     ; size = 4\n_dwReserved$ = 16                   ; size = 4\n_prog@12 PROC NEAR\n; File prog.c\n; Line 10\n    push    ebp\n    mov ebp, esp\n; Line 11\n    push    3\n    push    OFFSET FLAT:$SG74617\n    push    OFFSET FLAT:$SG74618\n    call    _memcmp\n    add esp, 12                 ; 0000000cH\n    push    eax\n    push    OFFSET FLAT:$SG74619\n    call    DWORD PTR __imp__printf\n    add esp, 8\n; Line 12\n    mov eax, 1\n; Line 13\n    pop ebp\n    ret 12                  ; 0000000cH\n_prog@12 ENDP\n_TEXT   ENDS\nEND\n\n    ",
    id: 382,
    PostTypeId: 2,
    PostId: 380,
    bounty: 0.17416304484641754,
    UserId: 92,
    upvoteCount: 27
  },
  {
    body:
      '\n\nHere\'s the problem. I have some text in my .txt file, it look exactly like this:\n\nBee-bee is the voice that Sheep giv-\ne. Mou-Mou is the voice that Cow gi-\nve. Miau-Miau is the voice that Ca-\nt gives.\n\n\nProgram that I need reading this file and connect line. Output (txt.file):\n\nBee-bee is the voice that Sheep give. Mou-Mou is the voice that Cow give. Miau-Miau is the voice that Cat gives.\n\n\nI think I need to do something like this:\n\n//Locate the file:\nFile file = new File("/path/to/file.txt");\n\n//Create a temporary file\nFile temp = File.createTempFile("file", ".txt", file.getParentFile());\n\n//String I want to remove\nString delete = "-";\n\n//open the file, open the tmp file, read the file line by line and replacing signs\nfor (String line; (line = reader.readLine()) != null;) {\n    // ...\n}\n\n//Delete the string from the line.    \nline = line.replace(delete, "");\n\n\nHere\'s a problem that it replace "Bee-bee" with "beebee" in output file and that is not what I want. I need some construction "if the sign is "-" and the next sign is carriage return, delete "-" but I have no idea how to write this.\n    ',
    title:
      "Remove a particular character from each line of a file if that occurs",
    id: 383,
    PostTypeId: 1,
    bounty: 0.9496725996759385,
    UserId: 86,
    viewCount: 7,
    upvoteCount: 35,
    comments: 1
  },
  {
    body:
      '\nThe String that you get back from readLine is going to a the whole line up to the linefeed character.\n\ni.e.\n\n\n  Bee-bee is the voice that Sheep giv-\n\n\nso all you need to test is that the last char is -  and if it is return a substring up to that point.\n\nYou can make use of the tradional lastIndexOf and substring or endswith or you could split the String using a regex pattern of -$\n\nAn example is\n\n    String line = "Bee-bee is the voice that Sheep giv-";\n    if (line.endsWith("-")) {\n        String output = line.substring(0, line.length() -1);\n        System.out.println(output);\n        // maybe append to a StringBuilder ?\n        stringBuf.append (output);\n    }\n\n\nThese substrings could then be appended to a StringBuilder so that you end up with the entire String as you want it.\n    ',
    id: 384,
    PostTypeId: 2,
    PostId: 383,
    bounty: 0.9496725996759385,
    UserId: 5,
    upvoteCount: 11
  },
  {
    body:
      "\n\nI have a large dataset with few 100 columns. Some of the columns are of type factor. I want to convert these columns from factor to character. I know in can convert them individually using the function as.character like this below\n\n     df$col_test_1 = as.character(df$col_test_1)\n\n\nHowever I am looking for an efficient way to convert all columns that have a certain common string in their column name for example _test_ . Convert all columns where their column name contains the string _test_ from factor to character. Any suggestions or tips on how to do this is much appreciated. Thanks.\n    ",
    title: "Convert columns with certain column names from factor to character",
    id: 385,
    PostTypeId: 1,
    bounty: 0.10285557939228429,
    UserId: 26,
    viewCount: 9,
    upvoteCount: 16,
    comments: 1
  },
  {
    body:
      "\nThis basic approach would work, although it is not clear what exactly are your requirements for it being efficient.\n\ndf <- data.frame(my_test_col=as.factor(c(1,2,3)), my_other_col=as.factor(c(4,5,6)))\n\nfor (colname in colnames(df)) {\n  if (grepl('_test_', colname)){\n    df[[colname]] <- as.character(df[[colname]])\n  }\n}\n\n    ",
    id: 386,
    PostTypeId: 2,
    PostId: 385,
    bounty: 0.10285557939228429,
    UserId: 81,
    upvoteCount: 40
  },
  {
    body:
      "\n\nIs there any way for sublime to find modules based on webpack's search paths?\n\ni.e. Given folder structure like this\n\n/src\n|-- /modules\n|-- /models\n\n\nand webpack.config.js\n\nmodule.exports.resolve = {\n  root: [\n    path.resolve('./'),\n    path.resolve('./src/')\n  ],\n  extensions: ['', '.ts', '.js'],\n  moduleDirectories: ['node_modules', 'src']\n}\n\n\nIs there a setting in sublime 3 where sublime won't falsely highlight the following for missing module?\n\nimport xyz from 'models/xyc';\nimport abc from 'modules/abc';\n\n    ",
    title: "Sublime 3 module search directory to match webpack",
    id: 387,
    PostTypeId: 1,
    bounty: 0.7244860442178143,
    UserId: 71,
    viewCount: 7,
    upvoteCount: 23,
    comments: 0
  },
  {
    body:
      "\n\nI'm using EndlessScroll function of https://github.com/fredwu/jquery-endless-scroll.\n\nI have a problem, I want to disable the endless scroll when scroll goes up, but I don't know how. I want to Cease Fire only when an Array is traversed with a pointer (I have a preloaded array).\n\nNote: \n - i is a counter\n - times are the number of items loaded\n - tam is the length of the array\n\ndata = [. . . . . . . . ]\ntam = data.lenght();\ni = 0;\nitems = 10;\n$('#ul-container').endlessScroll({\nfireDelay: 1,\nloader: '',\ninsertAfter: '#ul-container li:last',\ninsertBefore: '#ul-container li:last',\nceaseFireOnEmpty: false,\nceaseFire: function(j, p) {\n    if (i >= tam) {\n        return true;\n    }\n},\ncontent: function(j, p) {\n    var times = 0;\n    if (p>0) {\n        if (i < tam) {\n            to_return = \"\";\n            while (i + times < tam && times < 10) {\n                to_return += \"<p>\" + (i + times).toString() + \" \" + data[i + times][\"id\"]\n                    + \": \" + data[i + times][\"text\"] + \"</p>\";\n                times++;\n            }\n\n            i = i + times;\n            console.log(i);\n            //$('#ul-container').append(to_return);\n            return to_return\n        }\n\n\n    }\n}\n\n\nWhenever I scroll up I get 'undefined'. When I scroll down I get 10 items from the array (or the items that are left). And when the array is already displayed, it stops scrolling. \n\nJust to illustrate, this endlessScroll is inside an Ajax call. I'm using Django to get the data from a database, and then, load them to a  and display them.\n    ",
    title: "EndlessScroll Jquery",
    id: 388,
    PostTypeId: 1,
    bounty: 0.33324309153085463,
    UserId: 36,
    viewCount: 4,
    upvoteCount: 20,
    comments: 0
  },
  {
    body:
      "\n\non the plot below, the two curves intersect at 3 points. One on the left side, one in the middle, and one on the right side. I need to find the (x,y) coordinates for the three intersection points, but I'm having a hard time figuring out how to do that. Below is my code so far and the plot:\n\nClick here for plot\n\nHere's my code: \n\n% Define\n\nb1=3.5;\nb2=4.5;\nrho1=2.7;\nrho2=3.3;\nh=40;\nu2=(b2^2)*rho2;\n\n\nf1=.15;\nw1=2*pi*f1;\ncvec=3.5:.01:4.5;\np2=1./cvec;\nlhs=tan(h*w1.*sqrt((1./b1.^2)-(p2.^2)));\nrhs=(u2.*sqrt((p2.^2)-(1./b2.^2)))./(u1.*sqrt((1./b1.^2)-(p2.^2)));\n\nplot(cvec,rhs,cvec,lhs)\nxlim([3.6 4.6])\n\n    ",
    title:
      "MATLAB- How to find multiple x and y intersection points from two curves",
    id: 389,
    PostTypeId: 1,
    bounty: 0.4056254310245959,
    UserId: 59,
    viewCount: 3,
    upvoteCount: 29,
    comments: 1
  },
  {
    body:
      "\nYour code fails to execute (u1 is missing). But anyway, you can subtract lhs-rhs and then look for the results zero-crossing\n\ni.e.\n\nzci = @(v) find( v(1:end-1).*circshift(v(2:end), [-1 0]) <= 0); % Returns Zero-Crossing Indices Of Argument Vector\nzx = zci(lhs-rhs);\ncross_points = cvec(zx)\n\n    ",
    id: 390,
    PostTypeId: 2,
    PostId: 389,
    bounty: 0.4056254310245959,
    UserId: 7,
    upvoteCount: 1
  },
  {
    body:
      '\n\nSo I have my Request Path set as mywebsite.com/project/id/12378912?section=data, which maps to a corresponding Controller/Action and returns "project/index.jsp". \n\nInside index.jsp, I want to check what section-parameter it is and insert the correct PartialView section (but... I want to go to the Controller/Action to process some logic). Is this possible?\n\nI know I can do something like using (jsp:include) and insert another .jsp page, but I want to go to the Controller/Action (of that .jsp page) to run some logic to dynamically generate that .jsp page.\n\nIn ASP MVC, we had something similar...\n\n@{ Html.RenderAction("_" + (string)ViewData["projectSection"], "Project", new { id = Model.Id }); }\n\n\nwhich was embedded into the master/bigger view container.\n    ',
    title: "Spring Framework: Inserting another JSP file with a JSP file",
    id: 391,
    PostTypeId: 1,
    bounty: 0.3356638694476193,
    UserId: 31,
    viewCount: 5,
    upvoteCount: 18,
    comments: 2
  },
  {
    body:
      "\nThe request just returns the html generate by jsp, so you get the html result and then do what you want. \n    ",
    id: 392,
    PostTypeId: 2,
    PostId: 391,
    bounty: 0.3356638694476193,
    UserId: 3,
    upvoteCount: 2
  },
  {
    body:
      '\n<jsp:include page="${request.contextPath}/mvc/project/id/${ project.id }/_data"></jsp:include>\n\n\ninto the correct location on the web page is what I was looking for. This code snippet actually goes to the Controller, processes any logic, and then generates the view --> outputting onto the main/parent page.\n    ',
    id: 393,
    PostTypeId: 2,
    PostId: 391,
    bounty: 0.3356638694476193,
    UserId: 73,
    upvoteCount: 26
  },
  {
    body:
      "\n\nI have a Python script that basically executes within a while loop:\n\nwhile 1:\n  <do stuff>\n\n\nWhat I'd like to do is have it perform an action at random like, once or twice ever hour or so.\n\nI've tried solutions like if random.random() > 5: but it just happens way too often.\n\nAny ideas how I can ensure it goes off once or twice an hour while not going off constantly?\n    ",
    title: "Python Random in While Loop",
    id: 394,
    PostTypeId: 1,
    bounty: 0.6948922440169207,
    UserId: 73,
    viewCount: 10,
    upvoteCount: 23,
    comments: 3
  },
  {
    body:
      "\nUse the randomizer to create a time for the action to run. This won't block your other actions in the loop.\n\nimport time\nimport random\n\ndef get_new_time_to_perform_action():\n  delay_minutes = (30 + random.random() * 30) # 30-60 minutes\n  return time.time() + delay_minutes * 60\n\nnext_time_to_run = get_new_time_to_perform_action()\n\nwhile True:\n  if (time.time() >= next_time_to_run):\n    # <do action>\n    next_time_to_run = get_new_time_to_perform_action()\n  # <do other actions>\n\n    ",
    id: 395,
    PostTypeId: 2,
    PostId: 394,
    bounty: 0.6948922440169207,
    UserId: 70,
    upvoteCount: 34
  },
  {
    body:
      "\nIf you have a time window, it maybe a good option apply a sleep interval.\n\nBy example, you can do:\n\nfrom time import sleep\nfrom random import randint\n\nwhile 1:\n  <do stuff>\n  sleep(randint(0, 3600))\n\n    ",
    id: 396,
    PostTypeId: 2,
    PostId: 394,
    bounty: 0.6948922440169207,
    UserId: 32,
    upvoteCount: 33
  },
  {
    body:
      "\nTo control the number of repetition each hour I would suggest picking an int with random.randint then to choose the exact moment the events will happend within the hour you could pick a float in [0,1[ with random.random and convert it to a number of seconds and wait with time.sleep.\n    ",
    id: 397,
    PostTypeId: 2,
    PostId: 394,
    bounty: 0.6948922440169207,
    UserId: 64,
    upvoteCount: 18
  },
  {
    body:
      '\n\nI would like to know if it\'s possible to save values using Mel or python. For example, I am using : \n\nint $a = 5;\nint $b = 4;\nstring $declare = ( "matrix $m[" + $a + "][" + $b + "];" );\neval $declare;\n$m[0][1] = 1;\n//etc..\n\n\nAnd so forth, so I can modify values in it, but the storage has a limitation. Is it possible to save data in Maya, maybe by saving them is a single file? Thanks for any response! \n    ',
    title: "Maya MEL / Python Saving Data",
    id: 398,
    PostTypeId: 1,
    bounty: 0.28733080358053886,
    UserId: 65,
    viewCount: 9,
    upvoteCount: 7,
    comments: 1
  },
  {
    body:
      "\nIf you want to save arbitrary data inside a file, use the fileInfo command.  By default fileInfo only saves strings or numbers, but you can convert any data type you need to something fileInfo can use by saving it to, say, a JSON object and stashing a text dump of the JSON object in the fileInfo.  This question includes an example which uses fileInfo to store a lot of zipped binary data inside a fileInfo;  the link in the question includes example code showing how it works.\n\nDon't forget that Maya is optimized for working with geometry data.  You can also store your points, for example, as an actual maya mesh object in an mb or ma file and then import it and query it.  That will usually be faster than imventing your own format to do things Maya already does well\n    ",
    id: 399,
    PostTypeId: 2,
    PostId: 398,
    bounty: 0.28733080358053886,
    UserId: 39,
    upvoteCount: 35
  },
  {
    body:
      "\n\nI am kind of stumped on this. I have used the Angular 2 quick start projects as a reference for unit testing Angular 2 but it seems to assume you have an app in play. In my case we have NPM packages that have Angular 2 modules in them that are shared across various projects in our organization. I would like to be able to unit test the code inside these common libraries in isolation (without them being part of an app).\n\nI am looking for examples or a tutorial or something explaining the best approach to this, Google has not provided any help.  \n    ",
    title:
      "Unit testing Angular 2 components inside a common library NPM Package no app context",
    id: 400,
    PostTypeId: 1,
    bounty: 0.5356801971666327,
    UserId: 3,
    viewCount: 8,
    upvoteCount: 29,
    comments: 1
  },
  {
    body:
      "\nWell I am doing in my Karma test something like:\n\nCreate a mock component\n\n@Component({\n       template: \"\",\n       selector: 'mock'\n})\nexport class MockComponent implements OnInit {\n  constructor() { }\n  ngOnInit() {\n    console.log(\"Is loaduing\");\n  }\n}\n\n\n\n\nCreate a mock service\n\nclass MockSomeService {\n  public subscribe(){}\n  public inizialize() {}\n}\n\n\n\n\nCreate ROUTES array\n\nexport var ROUTES = [ {path:\"/pathexample\", component: MockComponent}]\n\n\n\n\nCreate DECLARATIONS array\n\nexport var DECLARATIONS:Component[] = [\n  MockComponent, ExampleComponent\n];\n\n\n\n\nCreate PROVIDERS\n\nconst CONSTANTS_PROVIDERS: Provider[] = [\n  { provide: SomeService, useClass: MockSomeService }\n];\n\n\n\n\nWrite a test\n\ndescribe('Component: example', () => {\n\n  beforeEach(() => {\n    TestBed.configureTestingModule({ declarations: DECLARATIONS, providers: CONSTANTS_PROVIDERS, imports: [RouterTestingModule.withRoutes(ROUTES)] });\n  });\n\n  it('should create an instance', inject([ExampleComponent], (component: ExampleComponent) => {\n    expect(component).toBeTruthy();\n  }));\n\n});\n\n\nIf your component is using route.navigate you should use TestBed.overrideComponent and add template: '<router-outlet></router-outlet>' to your component if not have it yet and actually create the component like this TestBed.createComponent(ExampleComponent);\n    ",
    id: 401,
    PostTypeId: 2,
    PostId: 400,
    bounty: 0.5356801971666327,
    UserId: 62,
    upvoteCount: 34
  },
  {
    body:
      "\n\nI have a simple UITableViewController, tableview setup as static, I have only one UITableViewCell inside it, UITableViewCell has one UIImageView and one label inside it.\n\n\n\nConstraints added are as follows \n\n\n\nWhen I run this app , everything looks fine except the image doest stay square that is UIIMageView looses its width and height constraints and shows the entire image. Scale type used is Aspect Fill. Not sure whats going on attached is the result \n\n\n\nHow can I make UiImageView to follow constraints ?\n    ",
    title: "UIImageView not honouring constraints inside UITableViewCell",
    id: 402,
    PostTypeId: 1,
    bounty: 0.10160873598265985,
    UserId: 26,
    viewCount: 10,
    upvoteCount: 20,
    comments: 1
  },
  {
    body:
      "\nSet clipsToBounds to true from the storyboard or you can also set it programmatically as:\n\nimageView.clipsToBounds = true;\n\n\nThis will resolve your issue. \n    ",
    id: 403,
    PostTypeId: 2,
    PostId: 402,
    bounty: 0.10160873598265985,
    UserId: 79,
    upvoteCount: 6
  },
  {
    body:
      "\n\nI'm working on a project based on Laravel 5.3 and Backpack CRUD. My project has about 8 different content types (news, page, portfolio, events, team, video, gallery, jobs).\n\nI need to be able to add tags to every content type (n-n), and every content type has its own specific tags, so tags are NOT shared between the content types.\n\nIf I want to use the select_multiple or select2_multiple field type, I would need 8 tables for the content itself, 8 pivot tables, and 8 tables for the tags(!).\n\nObviously I would like to have just one table for the tags, but if I use the select_multiple or select2_multiple field type, I get all tags in the edit-form of every content type.\n\nSo, my question is: Is there an elegant way to filter the results of the select_multiple or select2_multiple field type?\n\nI have created a simple schema with two content types:\nhttp://dbdesigner.net/designer/schema/60412\n\nIn this example I want to be able to filter the tag list on content_type_id, when I'm editing the content of news or page. So I just want to see the news tags in the news-edit form, and just the page tags, in the page-edit form.\n\nOr maybe I should just use the select_multiple field type as intended, and accept the 8 tag tables(?)\n\nAny help or advice would be greatly appreciated.\n    ",
    title: "n-n relationships for multiple content types",
    id: 404,
    PostTypeId: 1,
    bounty: 0.6858821379348146,
    UserId: 46,
    viewCount: 9,
    upvoteCount: 9,
    comments: 1
  },
  {
    body:
      "\nI think a clean way would be to:\n\n\ncreate different models for each tag use, so NewsTag, PageTag, PortfolioTag etc. that would only extend the Tag model and use a global scope to filter the results after content_type_id;\nuse backpack select2_multiple fields with NewsTag, PageTag, PortfolioTag etc; anything you set on the Tag model will be used (including the table attribute, mutators, accessors, etc);\n\n\nCheers!\n    ",
    id: 405,
    PostTypeId: 2,
    PostId: 404,
    bounty: 0.6858821379348146,
    UserId: 96,
    upvoteCount: 32
  },
  {
    body:
      "\n\nWhen I change resolution of my monitor, it increases resolution of ready API but resolutions for other apps gets messed up.\nI tried increasing font size as well but that did not help much.\nPlease let me know if there is any other way to change resolution for only Ready API software.\n\nI am facing one more issue where Ready API is working very slowly. I followed the steps to improve memory usage of the tool but that did not help much. Please let me know if someone has figured out any solutions for that as well. \n\nI tried using the latest version 1.9.0 as well. Latest version is more slower than 1.6.0.\n    ",
    title: "How to change resolution in ready! API 1.6.0?",
    id: 406,
    PostTypeId: 1,
    bounty: 0.9267908460566534,
    UserId: 25,
    viewCount: 4,
    upvoteCount: 31,
    comments: 1
  },
  {
    body:
      "\nCan try the below solution from here:\n\n\n  Right click on SoapUI icon -> Properties - > Compatibility Tab - check Disable display scaling on high DPI settings\n\n\nIt is mentioned above SoapUI Icon. You can use the same for Ready API\n\nAnd you may report the issue about slowness of ReadyAPI product to the SmartBear support team. \n    ",
    id: 407,
    PostTypeId: 2,
    PostId: 406,
    bounty: 0.9267908460566534,
    UserId: 59,
    upvoteCount: 16
  },
  {
    body:
      '\n\nI get this error when I access URL http://localhost:8080/RiteshMVC/hey:\n\n\n  org.springframework.web.servlet.DispatcherServlet noHandlerFound\n  WARNING: No mapping found for HTTP request with URI [/SpringDemo/] in\n  DispatcherServlet with name \'SpringMVCDemo\'\n\n\nI have loaded all my jars with commons-logging.\n\nThis is my code.\n\nweb.xml\n\n<?xml version="1.0" encoding="UTF-8"?>\n<web-app version="3.1" xmlns="http://xmlns.jcp.org/xml/ns/javaee"      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd">\n\n     <display-name>RiteshMVC</display-name>\n     <servlet>\n       <servlet-name>RiteshMVCDemo</servlet-name>\n       <servlet-class>org.springframework.web.servlet.DispatcherServlet                   </servlet-class>\n       <load-on-startup>1</load-on-startup>\n     </servlet>\n\n     <servlet-mapping>\n       <servlet-name>RiteshMVCDemo</servlet-name>\n       <url-pattern>/</url-pattern>\n     </servlet-mapping> \n\n</web-app>\n\n\nRiteshMVCDemo-servlet.xml\n\n<?xml version="1.0" encoding="UTF-8"?>\n\n<beans xmlns="http://www.springframework.org/schema/beans"\n  xmlns:context="http://www.springframework.org/schema/context"\n  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n  xsi:schemaLocation="\n  http://www.springframework.org/schema/beans     \n  http://www.springframework.org/schema/beans/spring-beans-3.0.xsd\n  http://www.springframework.org/schema/context \n  http://www.springframework.org/schema/context/spring-context-3.0.xsd">\n\n  <context:component-scan base-package="ritesh.dhoke" />\n\n  <bean  class="org.springframework.web.servlet.view.InternalResourceViewResolver">\n    <property name="prefix" value="/WEB-INF/" />\n    <property name="suffix" value=".jsp" />\n  </bean>\n</beans>\n\n\nControllers.java\n\npackage ritesh.dhoke;\n\nimport org.springframework.stereotype.Controller;\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RequestMethod;\nimport org.springframework.web.servlet.ModelAndView;\n\n@Controller\n@RequestMapping("/hey")\npublic class Controllers \n{\n    @RequestMapping(method=RequestMethod.GET)\n    public ModelAndView Hey(){\n\n        return new ModelAndView("hello", "User", "This is cool man");\n    }\n}\n\n\nhello.jsp\n\n<%@ page language="java" contentType="text/html; charset=ISO-8859-1"\n    pageEncoding="ISO-8859-1"%>\n<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">\n<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">\n<title>Insert title here</title>\n</head>\n<body>\nThis is me ${User}\n</body>\n</html>\n\n\nPlease help. Seems to be perfect but I don\'t know whats wrong. Thanks in advance!\n    ',
    title: "Getting Warning in Spring MVC",
    id: 408,
    PostTypeId: 1,
    bounty: 0.42898698324264894,
    UserId: 74,
    viewCount: 9,
    upvoteCount: 16,
    comments: 1
  },
  {
    body:
      '\nIn your web.xml file configuration, you have not mention spring context configuration file location. So spring will not be able to find RiteshMVCDemo-servlet.xml file. Also you have not registered for ContextLoaderListener. Please use below code snippet:\n\n<?xml version="1.0" encoding="UTF-8"?>\n<web-app ...>\n<context-param>\n  <param-name>contextConfigLocation</param-name>\n  <param-value>/WEB-INF/spring/root-context.xml</param-value>\n</context-param>\n\n<!-- Creates the Spring Container shared by all Servlets and Filters -->\n<listener>\n  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>\n</listener>\n\n<display-name>RiteshMVC</display-name>\n<servlet>\n  <servlet-name>RiteshMVCDemo</servlet-name>\n  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>\n  <init-param>\n    <param-name>contextConfigLocation</param-name>\n    <param-value>/WEB-INF/spring/appServlet/RiteshMVCDemo-servlet.xml</param-value>\n  </init-param>\n  <load-on-startup>1</load-on-startup>\n</servlet>\n\n<servlet-mapping>\n  <servlet-name>RiteshMVCDemo</servlet-name>\n  <url-pattern>/</url-pattern>\n</servlet-mapping>  \n</web-app>\n\n\nroot-context.xml and RiteshMVCDemo-servlet.xml should be in the location as mentioned in the configuration\n    ',
    id: 409,
    PostTypeId: 2,
    PostId: 408,
    bounty: 0.42898698324264894,
    UserId: 19,
    upvoteCount: 8
  },
  {
    body:
      "\n\nHow a single operation with multiple callbacks (e.g. START with some params, PROGRESS called multiple times with other params and END with other params) should be exposed in RxJava?\n\nI'm thinking to use a wrapper object that contains an observable for each kind of callback and that a subscription on any of those observable triggers the start of the operation with the other binded on the same underlying operation\n\nEDIT: An example callback interface for a download operation\n\n\ninterface Callback {\n    void onDownloadStarted(long contentLength, String mimeType, String nameHint);\n    void onDownloadProgress(long downloadedBytes);\n    void onDownloadCompleted(File file);\n}\n\n    ",
    title: "Single operation with multiple callbacks in RxJava",
    id: 410,
    PostTypeId: 1,
    bounty: 0.7077699645345286,
    UserId: 25,
    viewCount: 8,
    upvoteCount: 21,
    comments: 1
  },
  {
    body:
      '\nYou could think of your operation as an Observable<Status> where\n\npublic static class Info {\n    public final long contentLength;\n    public final String mimeType;\n    public final String nameHint;\n    public Info(long contentLength, String mimeType, String nameHint) {\n        this.contentLength = contentLength;\n        this.mimeType = mimeType;\n        this.nameHint = nameHint;\n    }\n}\npublic static class Status {\n    public final Info info;\n    public final long downloadProgress; //in bytes\n    public final Optional<File> file;\n    public Status(Info info, long downloadProgress, Optional<File> file) {\n        this.info = info;\n        this.downloadProgress = downloadProgress;\n        this.file = file;\n    }\n}\n\n\nThen you could model your download operation as:\n\nObservable<Status> download();\n\n\nYou get no emissions till the download has started and the final emission has the File result. \n\nYou could use it like this:\n\ndownload()\n   .doOnNext(status -> System.out.println(\n        "downloaded " \n        + status.downloadProgress \n        + " bytes of " + status.contentLength))\n   .last()\n   .doOnNext(status -> System.out.println(\n        "downloaded " + status.file.get())\n   .doOnError(e -> logError(e))\n   .subscribe();\n\n    ',
    id: 411,
    PostTypeId: 2,
    PostId: 410,
    bounty: 0.7077699645345286,
    UserId: 85,
    upvoteCount: 34
  },
  {
    body:
      "\n\nI wan to list all database in Monogodb and output to a txt file, but it did not work.\n\nmongo 127.0.0.1/test -eval 'var c= show databases;' >>db_list.txt\n\n\nthe error message is \n\nMongoDB shell version: 2.6.12\nconnecting to: 127.0.0.1/test\n2016-12-06T12:12:32.456-0700 SyntaxError: Unexpected identifier\n\n\nanyone knows how to make this work. I appreciate any help.\n    ",
    title: "how to output the result to a file in monogodb",
    id: 412,
    PostTypeId: 1,
    bounty: 0.42067807507293775,
    UserId: 90,
    viewCount: 10,
    upvoteCount: 20,
    comments: 2
  },
  {
    body:
      '\nTo use eval and list databases directly on a shell, the following query should be helpful.\n\nmongo test --eval "printjson(db.adminCommand(\'listDatabases\'))"\nMongoDB shell version: 3.2.10\nconnecting to: test\n{\n        "databases" : [\n                {\n                        "name" : "local",\n                        "sizeOnDisk" : 73728,\n                        "empty" : false\n                },\n                {\n                        "name" : "m034",\n                        "sizeOnDisk" : 11911168,\n                        "empty" : false\n                },\n                {\n                        "name" : "test",\n                        "sizeOnDisk" : 536576,\n                        "empty" : false\n                }\n        ],\n        "totalSize" : 12521472,\n        "ok" : 1\n}\n\n\nThis will list all the collection names in a particular DB.\n\nmongo test --eval "printjson(db.getCollectionNames())"\nMongoDB shell version: 3.2.10\nconnecting to: test\n[\n        "aaa",\n        "areamodel",\n        "email",\n        "hex",\n        "key",\n        "mel",\n        "multi",\n        "ques",\n        "rich"\n]\n\n\nA sample execution for reference (screenshot)\n\n    ',
    id: 413,
    PostTypeId: 2,
    PostId: 412,
    bounty: 0.42067807507293775,
    UserId: 23,
    upvoteCount: 18
  },
  {
    body:
      "\nInstead of test you can go simply,\nmongo db_name query.js > out.json\n\nhere query.js contains any query like:\nprintjson( db.adminCommand('listDatabases') )\n    ",
    id: 414,
    PostTypeId: 2,
    PostId: 412,
    bounty: 0.42067807507293775,
    UserId: 53,
    upvoteCount: 7
  },
  {
    body:
      '\n\nI have a javasript running on a JAVA FX Web View. I am making an ajax call to an end point.\n\nvar formData3 = new FormData();\n\nvar content = veryLargeJSONString;\n\nformData3.append("userfile", content);\nxhttp3.open("POST", "http://testurl", true);\nxhttp3.setRequestHeader("cache-control", "no-cache");\nxhttp3.send(formData);\n\n\nWhen xhttp3.open("POST", "http://testurl", false); everything works as expected, the response always returns even though it takes a long time due to the large size of the form data. \n\nWhen the asynch flag is set to true, the response never even gets sent because JFX gives the following exception.\n\nPM com.sun.webkit.network.URLLoader doRun\nWARNING: Unexpected error\njava.io.IOException: Error writing request body to server\n    at sun.net.www.protocol.http.HttpURLConnection$StreamingOutputStream.checkError(HttpURLConnection.java:3479)\n    at sun.net.www.protocol.http.HttpURLConnection$StreamingOutputStream.write(HttpURLConnection.java:3462)\n    at com.sun.webkit.network.URLLoader.sendRequest(URLLoader.java:373)\n    at com.sun.webkit.network.URLLoader.doRun(URLLoader.java:162)\n    at com.sun.webkit.network.URLLoader.lambda$run$91(URLLoader.java:128)\n    at java.security.AccessController.doPrivileged(Native Method)\n    at com.sun.webkit.network.URLLoader.run(URLLoader.java:127)\n    at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)\n    at java.util.concurrent.FutureTask.run(FutureTask.java:266)\n    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)\n    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)\n    at java.lang.Thread.run(Thread.java:745)\n\n\nThis of course only occurs when the formData content is very large, the exact same call with different smaller content has no issue. \n\nI thought maybe this had something to do with the way I was starting the JVM, and thus I tried increasing the starting heap size and also max heap size. \n\njava -jar test.jar -Xms4096m -Xmx8192m\n\n\nSo first question is, what could be causing this java exception and why does it only occur when Asynch is set to true for the ajax call. \n\nSecond What happens if in my java -jar start up params I try to allocate more start up heap than my system has available? So if I have 16 gigs of RAM and i\'m using 13 gigs and then I start my java app and try to allocate for the starting heap 4 gigs, will it just ignore my start up parameter? \n    ',
    title:
      "JAVAFX Ajax Call sporadically fails to add to request body when asynch is set to true",
    id: 415,
    PostTypeId: 1,
    bounty: 0.8663354190199968,
    UserId: 1,
    viewCount: 1,
    upvoteCount: 11,
    comments: 1
  },
  {
    body:
      "\n\n  what could be causing this java exception and why does it only occur when Asynch is set to true for the ajax call.\n\n\nThis seems like a WebView bug. You may wish to report it at http://bugreport.java.com. \n\nI do not know what causes it. But, as it occurs for asynchronous processing only, my guess is that it is a concurrency implementation issue in the WebView code.\n\nProposed Workaround\n\n\nUse a 3rd party library to make the ajax call using Java concurrency utilities or a third party library:\n\n\nHow do you create an asynchronous HTTP request in JAVA?\n\nEnsure you use Platform.runLater as appropriate to process the async response.\nUse communication between JavaScript running in WebView and your Java code to transfer any data required between the two:\n\n\nMaking Upcalls from JavaScript to JavaFX\n\n\n\nAnswers to additional questions\n\n\n  I was starting the JVM, and thus I tried increasing the starting heap size and also max heap size.\n\njava -jar test.jar -Xms4096m -Xmx8192m\n\n\n\n4 gigs of memory is a lotta memory. 8 gigs is even more. I don't think you have a memory issue here and it is highly unlikely you need to allocate so much memory to your application on startup.\n\n\n  So if I have 16 gigs of RAM and i'm using 13 gigs and then I start my java app and try to allocate for the starting heap 4 gigs, will it just ignore my start up parameter?\n\n\nNo, it will respect your starting parameters.  The JVM will allocate the minimum you requested (4 gigs).  It is unlikely your app is actually using more than four gigs, so it won't probably won't use any more memory than four gigs.  If your app does use more than your available physical ram size (16 gigs less space for OS and other programs), then everything will still work, just slowly as the OS pages your app memory.\n    ",
    id: 416,
    PostTypeId: 2,
    PostId: 415,
    bounty: 0.8663354190199968,
    UserId: 92,
    upvoteCount: 5
  },
  {
    body:
      "\n\ni need help with this array, what i want to do is\n\n\nILUMINATION\n\n\nLAMPS\n\n\nDesk\nWall\n\n\nFurniture\n\n\nchairs\ntables\n\n\nentertainment\n\n\n\n\ni cant loop through second level but i dont know how to do it for third level, i think its pretty easy but i cang figure out.\n\nHere is the link to my page as you can see i go throug 1st and 2d level i would like to retrive also a 3rd level\nhttp://communita.com.mx/marca_producto.php?id=6 \n\nHope you can help me.\nThanks in advance.\n\n$qry = \"\n    SELECT nomPadre,pp.idPadre, pathImgPadre,c.idCategoria,nomCategoria\n    FROM productos p\n    LEFT JOIN productos_categoria pc ON pc.idProducto = p.idProducto\n    LEFT JOIN productos_padre pp ON pp.idProducto = p.idProducto\n    LEFT JOIN categorias c ON c.idCategoria = pc.idCategoria\n    LEFT JOIN padre pa ON pa.idPadre = pp.idPadre\n    LEFT JOIN imagenesPadre i ON i.idPadrePa = pp.idPadre\n    WHERE marProducto = :idMarca AND i.idMarcaPa = :idMarca AND c.catPadre = pp.idPadre\";\n    $stmt = $db->prepare($qry);\n    $stmt->execute(array(':idMarca' => $_GET['id']));\n\nwhile ($row=$stmt->fetch()) {\n        //  usa el idPadre como key para agrupar el arreglo\n\n        // these two values will just overwrite with the same thing if they're repeated\n        $padres[$row['idPadre']]['nomPadre'] = $row['nomPadre'];\n        $padres[$row['idPadre']]['idPadre'] = $row['idPadre'];\n        $padres[$row['idPadre']]['idMarca'] = $row['idMarca'];\n        $padres[$row['idPadre']]['pathImgPadre'] = $row['pathImgPadre'];\n        $padres[$row['idPadre']]['categoria'][$row['idCategoria']] = $row['nomCategoria'];\n\n    }\n\n\nand this is how i retrive info\n\n<ul class=\"grid cs-style-4 col-xs-12 col-sm-12 col-md-12 text-center\">\n        <?php foreach ($padres as $padre): ?>\n            <li class=\"col-md-3 col-lg-3\">\n                <figure>\n                    <div class=\"\">\n          <img src=\"<?= $padre['pathImgPadre']?>\" alt=\"<?= $padre['nomPadre']?>\">\n        </div>\n                    <figcaption class=\"subcate\">\n                        <?php foreach ($padre['categoria'] as $id => $categoria): ?>\n\n                        <a href=\"cateXmarca.php?ma=<?= $_GET['id']?>&pa=<?= $padre['idPadre']?>&ca=<?=$id?>\"><h6>•&nbsp<?= $categoria ?></h6></a><br>\n                        <?php endforeach ?>\n                    </figcaption>\n                </figure>\n                <div class=\"col-xs-12 col-sm-12 col-md-12 text-center\">\n                    <span class=\"caption\"><?= $padre['nomPadre']?></span>\n                </div>\n            </li>\n            <?php endforeach ?>\n        </ul>\n\n    ",
    title: "loop through family, category and sub-categories",
    id: 417,
    PostTypeId: 1,
    bounty: 0.26217185699657564,
    UserId: 40,
    viewCount: 10,
    upvoteCount: 40,
    comments: 1
  },
  {
    body:
      '\nTo acces your array depths through for loops you can do it like this. The if statements are there to secure that there are no erros exisiting in the case a part of the array does not have the same depth. See an online DEMO here\n\n<?php\n    $arr  = array(\n        "ILUMINATION" => array(\n                "LAMPS" => array(\n                        "desk",\n                        "wall"\n                    )\n            ),\n        "Furniture" => array(\n                "chairs",\n                "tables" => array(\n                    "entertaiment"\n                    )\n            )\n    );\n\n    foreach($arr as $catagory){\n        //first layer, will output: ILUMINATION, Furniture\n        if(is_array($catagory)){\n            foreach($catagory as $sub_catagory){\n                //second layer, will ouput: LAMPS, chairs, tables\n                if(is_array($sub_catagory)){\n                    foreach($sub_catagory as $item){\n                        //third layer, will output: desk, wall, entertaiment\n                    }\n                }\n            }\n        }\n    }\n\n?>\n\n\nTo acces it through simple selecting, look at this example: Or see the DEMO here\n\n<?php\n    $arr  = array(\n        "ILUMINATION" => array(\n                "LAMPS" => array(\n                        "desk",\n                        "wall"\n                    )\n            ),\n        "Furniture" => array(\n                "chairs",\n                "tables" => array(\n                    "entertaiment"\n                    )\n            )\n    );\n\n    echo $arr["Furniture"]["tables"][0];\n\n?>\n\n\nThis will give you entertaiment as a result. You need to remember to put an extra depth in there with the 0 as it still is an array item you are trying to acces. \n\nTo add to multidimensional arrays follow this example right here: \n\n$arr["Furniture"]["sofas"] = array("leather", "fabric");\n\n    ',
    id: 418,
    PostTypeId: 2,
    PostId: 417,
    bounty: 0.26217185699657564,
    UserId: 86,
    upvoteCount: 29
  },
  {
    body:
      '\n\nI have a simple template that deploys a NIC, a VM, and a CustomScriptExtension:\n\n{\n    "name": "Microsoft.CustomScriptExtension-20161202",\n    "apiVersion": "2015-01-01",\n    "type": "Microsoft.Resources/deployments",\n    "properties": {\n        "mode": "incremental",\n        "templateLink": {\n            "uri": "https://gallery.azure.com/artifact/20161101/Microsoft.CustomScriptExtension-arm.2.0.50/Artifacts/MainTemplate.json"\n        },\n        "parameters": {\n            "vmName": {\n                "value": "[parameters(\'virtualMachineName\')]"\n            },\n            "location": {\n                "value": "[parameters(\'configScriptLocation\')]"\n            },\n            "fileUris": {\n                "value": "[parameters(\'configScriptFileUris\')]"\n            }\n        }\n    },\n    "dependsOn": [\n        "[concat(\'Microsoft.Compute/virtualMachines/\', parameters(\'virtualMachineName\'))]"\n    ]\n},\n\n\nMy script enables some windows features, downloads .NET 4.6.1 from blob storage and installs it. I\'ve been running this template over and over deleting the VM, NIC, and VHD in between each deploy. Yesterday, I began to encounter an issue where my script extension never finishes deploying.\n\nI\'ll let the powershell script which calls New-AzureRmResourceGroupDeployment run and run but it never returns.\n\nHere\'s what I know:\n\n\nThe portal shows that the script extension\'s status is deploying and duration is 1s.\nWhen I sign into the VM, no log file has been created which indicates to me that the script has not even started since its first line creates the log file.\nThere is an empty folder at C:\\Packages\\Plugins\\Microsoft.Compute.CustomScriptExtension\\1.8\nUnder Event Viewer -> Applications and Services Logs -> Microsoft -> WindowsAzure -> Status -> Plugins I see that it is trying to download Microsoft.Compute_CustomScriptExtension_useast2_manifest.xml but can\'t resolve the hostname. In fact, all name resolution appears to be broken. I suspect this is the true problem but will continue investigation.\n\n\nWhy does my script extension never finish deploying? I tried clicking the Deployments link on the header of my resource group and, from there, deleting the deployments in case those deployment histories were somehow interfering but it appears not to help.\n\nI\'ve also noticed that my extension appears in the portal with the name \'CustomScriptExtension\' while I would expect it to be \'Microsoft.CustomScriptExtension-20161202\'.\n    ',
    title: "Azure custom script extension never finishes deploying",
    id: 419,
    PostTypeId: 1,
    bounty: 0.35641449653418644,
    UserId: 26,
    viewCount: 7,
    upvoteCount: 38,
    comments: 1
  },
  {
    body:
      "\nWe changed the DNS server and now my extensions are provisioning successfully.\n    ",
    id: 420,
    PostTypeId: 2,
    PostId: 419,
    bounty: 0.35641449653418644,
    UserId: 51,
    upvoteCount: 33
  },
  {
    body:
      "\n\nwhat are those operators in haskell?  and <*>\nI have them in a line like this:\n\nclass Evaluable e where\n    eval :: (Num a, Ord a) => (Ident -> Maybe a) -> (e a) -> (Either String a)\n    typeCheck :: (Ident -> String) -> (e a) -> Bool\n\ninstance Evaluable NExpr where\n    eval lookup (Plus left right) = (+) <$> eval lookup left <*> eval lookup right\n\n    ",
    title: "what are &lt;$&gt; and &lt;*&gt; operands in haskell",
    id: 421,
    PostTypeId: 1,
    bounty: 0.6968271870440064,
    UserId: 69,
    viewCount: 8,
    upvoteCount: 32,
    comments: 3
  },
  {
    body:
      '\nAs I am the one who showed you these operators, I\'ll give a brief explanation as to why I used them.\n\n\n\nTo review, a functor is a type constructor that lets you use the fmap function to apply a function to a "wrapped" value. In the specific case of the Either type constructor (partially applied, in this case, to String), you can apply a function to a Right value, but ignore the function if applied to a Left value (your error). It provides a way of error propagation without having to check for the error.\n\nfmap f (Right x) = Right (f x)\nfmap f (Left y) = Left y\n\n\n\n\nAn applicative functor is similar, except the function itself can be wrapped just like the argument it is applied to. The <*> operator unwraps both its operands, unlike fmap which only unwraps its right operand.\n\nRight f <*> Right x = Right (f x)\nLeft f <*> _ = Left f\n_ <*> Left y = Left y\n\n\nTypically, you don\'t wrap functions yourself: they result from using fmap to partially apply a function to a wrapped value:\n\nfmap (+) (Right 3) == Right (+ 3)\nfmap (+) (Left "error") == Left "error"\n\n\nSo, when we are working with Either values, the use of <$> (infix fmap) and <*> let us pretend we are working with regular values, without worrying about whether they are wrapped with Left or Right. Right values provide the expected Right-wrapped answer, and Left values are preserved. In the case of a binary operator, only the first Left value is returned, but that is often sufficient.\n\n(+) <$> Left "x undefined" <*> Left "y undefined" == Left "x undefined" <*> Left "y undefined"\n                                                  == Left "x undefined"\n\n(+) <$> Left "x undefined" <*> Right 9 == Left "x undefined" <*> Right 9\n                                       == Left "x undefined"\n\n(+) <$> Right 3 <*> Left "y undefined" == Right (+ 3) <*> Left "y undefined"\n                                       == Left "y undefined"\n\n(+) <$> Right 3 <*> Right 9 == Right (+3) <*> Right 9\n                            == Right 12\n\n\n\n\nIn the end, using the Applicative instance of Either String lets us combine the results of evaluating two subexpressions without having to explicitly check if either recursive call of eval actually succeeded. Successful recursive calls result in success; an error in either call is used as the same error for the top-level call.\n    ',
    id: 422,
    PostTypeId: 2,
    PostId: 421,
    bounty: 0.6968271870440064,
    UserId: 78,
    upvoteCount: 25
  },
  {
    body:
      "\nThe <$> operator is an infix form of fmap. It allows you to apply a pure function to the value wrapped into some parametric type that belongs to a Functor class. The type of <$> is (a -> b) -> f a -> f b.\n\nThe <*> operator is quite similar to <$>. It allows you to apply a function wrapped into a parametric type to a value wrapped into the same parametric type. The type of <*> is f (a -> b) -> f a -> f b.\n    ",
    id: 423,
    PostTypeId: 2,
    PostId: 421,
    bounty: 0.6968271870440064,
    UserId: 76,
    upvoteCount: 36
  },
  {
    body:
      "\nIn this particular case, it's a way to combine the results of eval. \nIf one part of the the expression is failing, then the whole expression is failing.\n\nThis way, its possible to separate error handling of your application logic and to avoid complex nested case ... of.\n\nTo fully understand this, I'll advise do read on functors first, then applicative functors.\n\nIn parallel you can play with Maybe and Either, and write the equivalent code using case expressions. \n    ",
    id: 424,
    PostTypeId: 2,
    PostId: 421,
    bounty: 0.6968271870440064,
    UserId: 18,
    upvoteCount: 35
  },
  {
    body:
      "\n\nI'm trying to create a calculated field in my pivot table and am having issues getting the calculation right.\n\nConsider the following \"raw\" pivot table:\n\n\n\nI tried to create a calculated field that showed the net availability for an application (general formula: (Availability-Downtime)/Availability). In the Calculated Field menu, I did the following:\n\n\n\nwhere the Formula is =(AVERAGE(Availability)-SUM(Downtime))/AVERAGE(Availability). The result is here:\n\n\n\nClearly the uptime for Application A in 2012 should be (1000-35)/1000 = 96.5%, but it's not. Where am I going wrong, here?\n\nHere is my raw data (Availability is the same for each value of Application... these values were merged from another table via VLOOKUP):\n\nID  Application Downtime    Year    Availability\n1   A   15  2012    1000\n2   A   20  2012    1000\n3   A   12  2013    1000\n4   A   0   2012    1000\n5   B   12  2012    1200\n6   B   14  2012    1200\n7   B   23  2012    1200\n8   B   90  2013    1200\n9   C   23  2012    1100\n10  C   32  2013    1100\n11  C   34  2013    1100\n12  C   12  2013    1100\n\n    ",
    title: "Pivot Table calculated field values are incorrect",
    id: 425,
    PostTypeId: 1,
    bounty: 0.4620664405718842,
    UserId: 18,
    viewCount: 7,
    upvoteCount: 37,
    comments: 1
  },
  {
    body:
      "\nI believe that it's the aggregation on top that is causing the unexpected result. \n\nFor example, where as you are expecting:\n\n(AVERAGE(Availability)-SUM(Downtime))/AVERAGE(Availability)\n\n\nWhat effectively is being calculated is:\n\n(SUM(Availability)-SUM(Downtime))/SUM(Availability)\n\n\n(or average depending how the field in the pivot table is aggregated)\n\nTo get the the calculation that you are after you could use a helper column populated with 1's to calculate the average availability, example below:\n\n(Availability/helper-Downtime)/(Availability/helper)\n\n\n(Then sum this in the pivot table)\n    ",
    id: 426,
    PostTypeId: 2,
    PostId: 425,
    bounty: 0.4620664405718842,
    UserId: 7,
    upvoteCount: 5
  },
  {
    body:
      "\n\nI use an NSURLConnection to download a file from a web server. \nIf the connection changes from 3G to Wifi while downloading, the download is not getting faster - it seems it still uses the 3G connection. How can I support changing from 2G/3G/4G to Wifi when downloading something? \nThank you!\n\n UIApplication *app = [UIApplication sharedApplication];\n            bgTask = [app beginBackgroundTaskWithExpirationHandler:^{\n                [app endBackgroundTask:bgTask];\n                bgTask = UIBackgroundTaskInvalid;\n            }];\n\n urlReq = [NSURLRequest requestWithURL:urlPDFListPath]\n urlConn = [[NSURLConnection alloc] initWithRequest:urlReq delegate:self];\n [urlConn start];\n\n    ",
    title: "NSURLConnection Connection Change",
    id: 427,
    PostTypeId: 1,
    bounty: 0.027665378106599636,
    UserId: 35,
    viewCount: 1,
    upvoteCount: 9,
    comments: 0
  },
  {
    body:
      "\n\n\n    This question already has an answer here:\n    \n        \n            Import CSV to mysql table\n                \n                    12 answers\n                \n        \n    \n    \nI have for example csv with a lot of columns and have my DB. I need to import all data from 1 column named oldfile to my database in column symbol. How to make it with sql query?\n    ",
    title: "Import into csv in MySQL",
    id: 428,
    PostTypeId: 1,
    bounty: 0.0513382210067006,
    UserId: 10,
    viewCount: 4,
    upvoteCount: 23,
    comments: 1
  },
  {
    body:
      "\nUse LOAD DATA INFILE to import from CSV to MySQL databse table. Example:\n\nLOAD DATA INFILE 'data.csv' INTO TABLE my_table;\n\n    ",
    id: 429,
    PostTypeId: 2,
    PostId: 428,
    bounty: 0.0513382210067006,
    UserId: 3,
    upvoteCount: 16
  },
  {
    body:
      "\n\nI am creating a jira plugin, and I currently have a webwork module. I have the following class to represent the webwork:\n\npublic class ReportWebworkAction extends JiraWebActionSupport {\n\n    private ArrayList<String> dataList = new ArrayList<String>();\n    private String temp;\n\n    //setters and getters for all varaibles\n\n    @Override\n    public String doDefault() throws Exception {\n         //1) make http request\n         //2) parse json data\n         //3) display list of data in html table using velocity.vm\n\n          return super.doDefault();\n    }\n}\n\n\nRight now I am able to successfully make the http request and parse the data into a list of java objects. How can I look through that list in my velocity page and for each item create a  element to display the data.\n\nThis is what I want to do:\n\n#foreach($item in $dataList) {\n    <tr>\n          <td>$item.key</td>\n          <td>$item.name</td>\n          <td>$item.value</td>\n    </tr>\n}\n#end\n\n\nMy velocity page can't seem to recognize the $dataList item which is an ArrayList variable in my ReportWebworkAction class. It can access the string variable temp however.\n\nI read that I need to use the Content Provider and the getContextMap() method, but I am confused of how to use that in a separate class. Can someone show me the correct way to do this? Thanks. \n    ",
    title:
      "How to display table content dynamically in jira plugin webwork module?",
    id: 430,
    PostTypeId: 1,
    bounty: 0.7931327587039709,
    UserId: 16,
    viewCount: 4,
    upvoteCount: 38,
    comments: 1
  },
  {
    body:
      "\nYou neeed getter: getDataList() in your WebWork class to be able to access it in velocity template. WebWork class members are transfered through accessors (getters).\n\nAnd yes getContextMap() is also a solution but it's tedious to put your object manually into context. WebWork do it automatically with use of properly named accessors.\n    ",
    id: 431,
    PostTypeId: 2,
    PostId: 430,
    bounty: 0.7931327587039709,
    UserId: 55,
    upvoteCount: 37
  },
  {
    body:
      "\n\nI am trying to install Jekyll on my x64 windows 10 computer. I have tried both chocolatey and the normal install but I keep getting the same SSL error:\n\nThe installation page and you tube videos no longer work to install Jekyll, so how do I get it with its new release?\n    ",
    title:
      "Installing Jekyll Windows 10 (I think Jekyll was updated so cacert.pem youtube videos no longer work)",
    id: 432,
    PostTypeId: 1,
    bounty: 0.2662714690480059,
    UserId: 59,
    viewCount: 4,
    upvoteCount: 7,
    comments: 1
  },
  {
    body:
      "\nyou first should install Ruby and Rubygems. Afterwards you can simply install jekyll as gem:\n\n\ngem install jekyll bundler jekyll-feed minima sass\n\n\nNote: probably the SSL error is related to this topic: \nhttps://github.com/rubygems/rubygems/issues/1736#issuecomment-261862935\n    ",
    id: 433,
    PostTypeId: 2,
    PostId: 432,
    bounty: 0.2662714690480059,
    UserId: 67,
    upvoteCount: 26
  },
  {
    body:
      '\n\ncase 1:\n    {\n        insert_menu();\n        donor[turn].inputData();\n        ::turn++; //accessing global variable\n        char c = \'\\0\';\n        while (c != \'0\') {\n            cout << "Press 1 to save, 0 to not save: ";\n            cin >> c;\n            fflush(stdin);\n            if (c == \'1\') {\n                cout << "Record saved successfully.";\n                cout << "\\nWant to insert another record? [y/n]: ";\n                char op = \'\\0\';\n                cin >> op;\n                //fflush(stdin);\n                if (op = \'y\') {\n                    cout << "Enter another record\\n\\n";\n                    donor[::turn].inputData();\n                    cout << "Record entered successfully\\n";\n                    ::turn++; //increment to global variable turn\n                } //end scope of nested if\n                else {\n                    cout << "Press Enter to return to main menu";\n                    //fflush(stdin);\n                //  getchar();\n                    break;\n                } //end scope of nested if\n            } //end scope of first if\n            else {\n                ::turn--;\n                cout << "Record not saved! You are being redirected to Main Menu" << endl;\n                system("pause");\n                //break;\n            }\n        } //end scope of while\n    } // end scope of case 1\n    break; //exiting case 1\n\n\nI dont know why, when I try to input into nested if else it is skipping it, whether i press y or n, it is giving option to enter input in both conditions. what is the issue?\n    ',
    title: "Why does nested if statement is not working?",
    id: 434,
    PostTypeId: 1,
    bounty: 0.36999397251403754,
    UserId: 84,
    viewCount: 8,
    upvoteCount: 39,
    comments: 1
  },
  {
    body:
      "\nI think the line if (op = 'y') { is the culprit.\n\nIt should be a double equals if (op == 'y') {\n    ",
    id: 435,
    PostTypeId: 2,
    PostId: 434,
    bounty: 0.36999397251403754,
    UserId: 97,
    upvoteCount: 10
  },
  {
    body:
      '\n\nBefore asking this question I googled a lot but couldn\'t find a solution that suits mine.\n\nIn Xamarin.Forms I have a byte[] array and I want to Convert that byte[] array to an Image. How can I achieve that, this is what i tried:\n\nIn Front End(XAML):\n\n<StackLayout BackgroundColor="Olive" x:Name="imagePanel">\n    <Image x:Name="PdfImage" Aspect="AspectFill" IsVisible="true"/>\n</StackLayout>    \n\n\nIn Code Behind(C#):\n\nbyte[] imageAsBytes = Constant.jsonPDF;\n\nvar stream1 = new MemoryStream(imageAsBytes);\nPdfImage.Source = ImageSource.FromStream(() => new MemoryStream(imageAsBytes));\n\nimagePanel.Children.Add(PdfImage);\n\n\nBut My problem is image is not displaying.\n\nCan anybody tell me what I\'m doing wrong. Any help would be greatly appreciated.\n\nThanks\n    ',
    title: "Convert A Byte[] Array to Image in Xamarin Forms",
    id: 436,
    PostTypeId: 1,
    bounty: 0.6680670566126068,
    UserId: 24,
    viewCount: 1,
    upvoteCount: 10,
    comments: 1
  },
  {
    body:
      '\n(XAML):\n\n <Image Grid.Row="1" x:Name="IncidentImageData" Grid.ColumnSpan="4" BackgroundColor="DarkGray" Aspect="AspectFill" WidthRequest="50" HeightRequest="175"/> \n\n\nviewModel.SImageBase64 is a byte[] \n\nCode Behind(C#):\n\nvar stream1 = new MemoryStream(viewModel.SImageBase64);\nIncidentImageData.Source = ImageSource.FromStream(() => stream1);\n\n\nsimply i have done like this and image has shown.\n    ',
    id: 437,
    PostTypeId: 2,
    PostId: 436,
    bounty: 0.6680670566126068,
    UserId: 89,
    upvoteCount: 19
  },
  {
    body:
      "\n\nLet's say I want to create a nodejs app that when I open a url it can opens and plays youtube url videos remotely over the local network.\n\nTo be more specific: \n\nPc host (Who send): Paste youtube url into web interface or even node console?\n\nWiiu browser (Who recive): With a web open that has an iframe? Or some way to get the url sent and is showed into?\n\nIt is possible? Where can I get some direction on how to do this?\n    ",
    title: "Open url remotely",
    id: 438,
    PostTypeId: 1,
    bounty: 0.2329136364849298,
    UserId: 10,
    viewCount: 7,
    upvoteCount: 13,
    comments: 1
  },
  {
    body:
      "\nThe easiest route I can think of to doing this would be this:\n\n\nBuild a Node Server. It doesn't have to be anything special. Just something that opens up a port. You can write it in raw Node or use Express\nCraft a web page that employs the Youtube API. You would need to sign up as a Developer on Google. It's free. This could be just as simple as an Iframe for the current video and links for others.\n\n\nhost this from your server.  \n\nUse Socket.io to develop management for peer connections. As in, when a link is clicked, trigger that event to be sent to all connected users. Write a function to change the currently viewing video in the frame.\n\n\nNothing is out of your league if you're willing to learn and put the effort in. Sans multiple connections I wrote one in React for a course a little while back. https://github.com/zfrisch/Youtube-React \n\nResources:\n\nhttps://nodejs.org/api/ - Node Documentation\n\nhttp://socket.io/ - Socket.io \n\nhttps://developers.google.com/youtube/ - youtube API\n    ",
    id: 439,
    PostTypeId: 2,
    PostId: 438,
    bounty: 0.2329136364849298,
    UserId: 66,
    upvoteCount: 17
  },
  {
    body:
      '\n\nI\'m landing on a webpage that has a menu on the left looking like this\n\nClient\n    contact history list inquiry\n    contact history list\nClient Search\nClient Service\n\n\nwhen you click on an item (eg: client) the sub items appear.  if you click on a sub item, it brings you to a new page.\n\nI am trying to automate these 2 steps using VBA.  but I\'m having no luck.  Here is the related html\n\nCollapsed\n\n<P tabIndex=0 class=inactiveMenuItem _submenuid="menuLevel10"  _ingeniummenuid="00100">Client</P>\n<UL id=menuLevel10 class=hiddenMenu _ingeniummenuid="00100" _parentmenuid="menuLevel1"></UL></LI>\n\n\n\n\nExpanded\n\n<P tabIndex=0 class=inactiveMenuItem _submenuid="menuLevel10" _ingeniummenuid="00100">Client</P>\n<UL id=menuLevel10 class=visibleMenu _ingeniummenuid="00100" _parentmenuid="menuLevel1" _populated="true">\n<LI><A class=inactiveMenuItem href="#" _flowname="BF1325InqList">Contact History List Inquiry</A></LI>\n<LI><A class=inactiveMenuItem href="#" _flowname="BF1324List">Contact History List</A></LI>\n\n\nI tried something like this\n\nDim objIE As New InternetExplorerMedium\nDim objDoc As HTMLDocument\nDim objElement As IHTMLElement\n\n\'go to website\nobjIE.Navigate ("http://SOMESITE.COM") (not the real site)\nobjIE.Visible = True\n\n\'sleep half seconds until page is loaded\nDo Until objIE.ReadyState = READYSTATE_COMPLETE\n    Sleep (500)\nLoop\n\n\'click on menu item\nSet objDoc = objIE.Document\nSet objElement = objDoc.getElementById("menuLevel10")\nobjElement.Click\n\n\nwhich didn\'t work.  I also tried to trigger the OnClick event with the FireEvent function but that did not work either.  Any help is appreciated.  My knowledge of HTML is very limited so please tell me if I should add more of the HTML source code or if pieces of information are missing.\n\nEDIT: it\'s an intranet site if that changes anything\n    ',
    title: "automating the navigation between pages of a website with VBA",
    id: 440,
    PostTypeId: 1,
    bounty: 0.3596161181029942,
    UserId: 83,
    viewCount: 5,
    upvoteCount: 31,
    comments: 2
  },
  {
    body:
      '\nYou can solve this problem with Selenium for VBA (https://github.com/florentbr/SeleniumBasic)\n\nAfter installing Selenium in your computer and including it in Excel\'s references.\n\nThe code to navigate such a website would be:\n\nDim Browser As New Selenium.IEDriver\nBrowser.get "http://SOMESITE.COM"\n\nbrowser.wait 5000\n\nbrowser.findElementById("menuLevel10").click\n\n    ',
    id: 441,
    PostTypeId: 2,
    PostId: 440,
    bounty: 0.3596161181029942,
    UserId: 88,
    upvoteCount: 31
  },
  {
    body:
      '\nI solved my problem.  basically, the element that I needed to click is not referenced by an ID, so I have to loop through all elements until I find the one I need (I used the innerHTML property to get a match).  once I have the element object, I can click it and it does what it is supposed to do.  I will add a code example when I have time\n\nSomething like this\n\nDo Until objdoc.body.all(lngIdx).innerHTML = "Client"\n    lngIdx = lngIdx + 1\n    If lngIdx = objdoc.body.all.Length Then\n        MsgBox "Could not find Menu Item"\n        Exit Function\n    End If\nLoop\nobjdoc.body.all(lngIdx).Click\n\n\nand then the same thing for the sub menu\n\nDo Until objdoc.body.all(lngIdx).innerHTML = "Contact History List Inquiry"\n    lngIdx = lngIdx + 1\n    If lngIdx = objdoc.body.all.Length Then\n        MsgBox "Could not find Sub Menu Item"\n        Exit Function\n    End If\nLoop\nobjdoc.body.all(lngIdx).Click\n\n    ',
    id: 442,
    PostTypeId: 2,
    PostId: 440,
    bounty: 0.3596161181029942,
    UserId: 32,
    upvoteCount: 29
  },
  {
    body:
      "\n\nas the title says I would like to check if a string contain at least 6 characters, one capital letter and one number, is required to use a regex or there is a simplier way to achieve this?\n\nExample of string: Hello7\n\nI need help to create the regex to do this, can you give me some help? at least how to say that I required minimum a specific number of characters, thanks.\n    ",
    title:
      "How to check if string has at least 6 characters, one capital letter and one number? - Javascript",
    id: 443,
    PostTypeId: 1,
    bounty: 0.3409236579882142,
    UserId: 73,
    viewCount: 1,
    upvoteCount: 28,
    comments: 2
  },
  {
    body:
      '\n(?=.*[A-Z])(?=.*\\d)(?=.{6}).*\n\n\nonline demo\n\n**it\'s just three (?=.*pattern) "lookaheads" in a row. Note the .* inside each lookahead to enable the pattern to scan the whole string. The last .* is just there to consume the rest of the string in case the three lookaheads succeed, and it\'s presence is purely optional, as in either case, "isMatch" or equivalent should be true.\n    ',
    id: 444,
    PostTypeId: 2,
    PostId: 443,
    bounty: 0.3409236579882142,
    UserId: 14,
    upvoteCount: 18
  },
  {
    body:
      "\nYou can write a single regex, but it will be convoluted. Instead you could:\n\nvar title = 'Hello7';\ntitle.match(/\\d/) && title.match(/[A-Z]/) && title.length >= 6 // => true\n\n    ",
    id: 445,
    PostTypeId: 2,
    PostId: 443,
    bounty: 0.3409236579882142,
    UserId: 54,
    upvoteCount: 39
  },
  {
    body:
      '\n\nASP.NET Core.\n\n <label asp-for="FooModelProperty">...</label>\n\n\nThis generates a form control with the appropriate property name. Same for select, input, etc.\n\nBut I need that name on some random element, e.g. a div, so I can use it in JavaScript. And the problem is asp-for tag helper doesn\'t work on an arbitrary element.\n\nSo how do I do something like this:\n\n<div asp-for="FooModelProperty">...</div>\n\n    ',
    title:
      "How can I use tag helpers to get a model property&#39;s name on an arbitrary element?",
    id: 446,
    PostTypeId: 1,
    bounty: 0.5708392210879221,
    UserId: 34,
    viewCount: 2,
    upvoteCount: 17,
    comments: 1
  },
  {
    body:
      '\nThe ModelExpression class was created to help with cases like these. You can add it as a property to your TagHelper and access the property name from there.\n\nHere\'s an example:\n\n\n\n[HtmlTargetElement("*", Attributes = forName)]\npublic class NameAppenderTagHelper : TagHelper\n{\n    private const string forName = "na-for";\n\n    [HtmlAttributeName(forName)]\n    public ModelExpression PropertyName { get; set; }\n\n    public override void Process(TagHelperContext context, TagHelperOutput output)\n    {\n        // add the property name as an attribute to the element\n        output.Attributes.Add("data-property-name", PropertyName.Name);\n\n        // if you\'d like the [Display] name value, you can use this:\n        // output.Attributes.Add("data-property-name", PropertyName.Metadata.DisplayName);\n        base.Process(context, output);\n    }\n}\n\n\nWhen used in Razor like this:\n\n<div na-for="MyProperty"></div>\n\n\nIt will output:\n\n<div data-property-name="MyProperty"></div>\n\n    ',
    id: 447,
    PostTypeId: 2,
    PostId: 446,
    bounty: 0.5708392210879221,
    UserId: 13,
    upvoteCount: 5
  },
  {
    body:
      '\n\nI have a doubt about the app.use on Node.js.\n\nBasically I have a form on a html file called index.html, and I want to serve the file via the app.use, like this:     \n\napp.use(express.static(__dirname + \'public\'));\n\n\nThe index.html file is on my public file, but i get an error saying that it cant get the index.html file, with the app.use like I did, can\'t I access the index.html file via url like this: localhost:portNumber/index.html\n\nfull code\n\nvar express = require("express");\nvar fs = require("fs");\nvar bodyParser = require("body-parser");\nvar app = express();\napp.use(bodyParser.urlencoded({extended:true}));\napp.use(express.static(__dirname + \'public\'));\napp.listen(3000,function(){\n\n    app.get("/listUsers",function(req,res){\n\n    fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){\n        res.json(JSON.parse(data));\n    });\n\n    app.post(\'/addUser\',function(req,res){\n        fs.readFile(__dirname + "/" + "users.json",\'utf8\',function(err,data){\n            data = JSON.parse(data);\n            var result = "{}";\n            response = {\n                        name:req.body.name,\n                        password:req.body.password,\n                        profession:req.body.profession,\n                        id:req.body.id\n\n            };\n\n            data.users.push(response);\n            fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(data),\'utf8\');\n            res.json(data);\n        });\n    });\n});\n\n\n})\n    ',
    title: "App.use access static file via url",
    id: 448,
    PostTypeId: 1,
    bounty: 0.9908026458328802,
    UserId: 3,
    viewCount: 1,
    upvoteCount: 30,
    comments: 0
  },
  {
    body:
      '\n\nI know there are a few posts out there with similar topics. However, I haven\'t been able to find anything that isn\'t problem specific and more general. \n\nPlease, I am not looking for a workaround - i.e. "if" statement forcing value to be zero if sufficiently close to it.\n\nIn my problem I am looking at the results of transforming a matrix into Hessenberg form (i.e. applying transforms to introduce zeros into the matrix - the details of the math aren\'t in question here). I originally wrote the code in MATLAB for a class and now would like to have the code in Python as well (all using basic operations - no "black box" operations here). I have successfully done so but am getting ever-so-slightly different answers with the entries that are supposed to be zero. \n\nFor example:\n\nA few entries that should be zero report as 1.77635684e-15 and 4.44089210e-16 - which all are approaching machine precision 2.2204460E-16.\n\nIs there a fundamental reason for this?\n\n\n\nEDIT\n\nTo refine my question a bit... \n\nWhat I end up having is a subtraction of nearly equal numbers - which I know in general is a bad idea to do - for those entries in which the value is supposed to be zero. Because they are nearly equal and very small, there is a form of a loss of precision. \n\nWhich leads me to think that there may be differences in how MATLAB and python treat such evaluations... \n\n\n\nEDIT EDIT\n\nHere is the output that is troubling me ("py" = Python output, "mat" = MATLAB output). I can live with differences up to the ~15th digit - this is machine precision. What troubles me is the 4th column. Here is where the nearly equal number subtraction comes into play and where we really see the discrepancies (rows 2-4 are negative of each other!)\n\n\n\n\n\nFor reference, here is my python code:\n\n\nA = [[1.,2.,3.,4.],[5.,6.,7.,8.],[9.,10.,11.,12.],[13.,14.,15.,16.]]\ntest = fctns.hess(A)\nprint(test)\n\ndef hess(A):\n# This function reduces any mxm matrix to Hessenberg form\n# through orthogonality similarity transforms. For symmetric A, the\n# Hessenberg form will be tridiagonal.\n\ndumA = np.array(A)\nn = np.shape(dumA)[1] # obtains n in (m,n) matrix\nv = []\n\nfor k in np.arange(0,n-2):\n    x = np.zeros((n-(k+1),1))\n    for idx in np.arange(0,len(x)):\n        x[idx]=dumA[k+1+idx,k]\n    tmp = np.shape(x)[0]\n    if np.sign(x[0][0]) == 0:\n        tmpsign = 1;\n    else:\n        tmpsign = np.sign(x[0][0]);\n    dum = tmpsign*norm(x,tmp)*np.eye(tmp,1) + x;\n    v.append(dum/norm(dum,tmp));\n    dumA[k+1:,k:] = dumA[k+1:,k:] - 2*np.dot(v[k],np.dot(np.transpose(v[k]),dumA[k+1:,k:]));\n    dumA[:,k+1:] = dumA[:,k+1:] - 2*np.dot(np.dot(dumA[:,k+1:],v[k]),np.transpose(v[k]));\n\nreturn(dumA)\n\n\nAnd here is my MATLAB code:\n\nfunction [ dumA ] = tridiag( A0 )\n% This function reduces any mxm matrix to tridiagonal form\n% through orthogonality similarity transforms. For symmetric cases, the\n% Hessenberg form will be tridiagonal.\n\ndumA = A0;\ntmp = size(dumA);\nm = tmp(1);\nv = cell(1,length(1:m-2));\n\nfor k = 1:m-2\n  x = dumA(k+1:m,k);\n  tmp = size(x);\n  if sign(x(1)) == 0\n    tmpsign = 1;\n  else\n    tmpsign = sign(x(1));\n  end\n  dum = tmpsign*norm(x,2)*eye(tmp(1),1) + x;\n  if sum(x) == 0\n    v{k} = dum;\n    continue\n  end\n  v{k} = dum/norm(dum,2);\n  dumA(k+1:m,k:m) = dumA(k+1:m,k:m) - 2*v{k}*(v{k}\'*dumA(k+1:m,k:m));\n  dumA(1:m,k+1:m) = dumA(1:m,k+1:m) - 2*(dumA(1:m,k+1:m)*v{k})*v{k}\';\nend\nend\n\n    ',
    title: "Python vs MATLAB - Treating numbers approaching machine precision",
    id: 449,
    PostTypeId: 1,
    bounty: 0.4785259593996467,
    UserId: 64,
    viewCount: 6,
    upvoteCount: 5,
    comments: 1
  },
  {
    body:
      "\nYour python code doesn't work as-written, and is different from the MATLAB code.  I fixed it:\n\ndumA = np.array(A)\nn = np.shape(dumA)[1] # obtains n in (m,n) matrix\nv = []\nfor k in np.arange(n-2):\n    x = dumA[k+1:,k:k+1]\n    tmp = np.shape(x)[0]\n    tmpsign = np.sign(x[0]);\n    if not tmpsign:\n        tmpsign = 1.\n    dum = tmpsign*norm(x,2)*np.eye(tmp,1) + x;\n    if not x.sum():\n        v.append(dum)\n        continue\n    v.append(dum/norm(dum,2));\n    dumA[k+1:,k:] -= 2.*(v[k] @ (v[k].T @ dumA[k+1:,k:]));\n    dumA[:,k+1:] -= 2.*((dumA[:,k+1:] @ v[k]) @ v[k].T);\nprint(dumA)\n\n\nI did some tests and for the first iteration, everything is identical up to the second-to-last line of the loop (the second-to-last assignment to dumA).  The problem occurs with this code: dumA[:,k+1:] @ v[k], dumA(1:m,k+1:m)*v{k}.  There is a very slight numerical difference in the last element of the matrix product, about of 2e-16.  This probably comes down to slightly different implementations.  \n\nBoth MATLAB and numpy seem to be using the same version of MKL for their computation, but without being able to see the MATLAB source code it is impossible to say exactly where the difference lies.\n    ",
    id: 450,
    PostTypeId: 2,
    PostId: 449,
    bounty: 0.4785259593996467,
    UserId: 48,
    upvoteCount: 28
  },
  {
    body:
      "\n\nI have a problem with my CherryPy install on my raspberry. \n\nWhen I request an function of CherryPy with ajax I have this message : \n\nXMLHttpRequest cannot load http://my_ip:8888/takePicture. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://my_ip' is therefore not allowed access.\n\n\nMy python code : \n\nimport time\nimport os\nimport cherrypy\n\nclass Camera(object):\n    @cherrypy.expose\n    def takePicture(self):\n        os.system('fswebcam -r 1280x720 -S 3 --info Salon --jpeg 100 --save images/history/%H%M%S.jpg')\n        os.system('fswebcam -r 1280x720 -S 3 --info Salon --jpeg 100 --save images/last.jpg')\n\nif __name__ == '__main__':\n    cherrypy.config.update({'server.socket_host': 'my_ip'})\n    cherrypy.config.update({'server.socket_port': 8888})\n    cherrypy.quickstart(Camera())\n\n\nHow change header response with CherryPy ? \n\nThanks by advance =) \n    ",
    title: "CherryPy Access-Control-Allow-Origin",
    id: 451,
    PostTypeId: 1,
    bounty: 0.786418653316407,
    UserId: 94,
    viewCount: 4,
    upvoteCount: 27,
    comments: 1
  },
  {
    body:
      "\nTry changing your startup to:\n\nif __name__ == '__main__':\n    conf = {\n        '/': {\n            'tools.response_headers.on': True,\n            'tools.response_headers.headers': [('Content-Type', 'image/jpeg'), ('Access-Control-Allow-Origin', 'http://my_ip')],\n            'server.socket_host': 'my_ip',\n            'server.socket_port': 8888\n        }\n    }\n    cherrypy.quickstart(Camera(), '/', conf)\n\n    ",
    id: 452,
    PostTypeId: 2,
    PostId: 451,
    bounty: 0.786418653316407,
    UserId: 88,
    upvoteCount: 39
  },
  {
    body:
      "\n\nI want to make sort of an activity feed but im a little stuck on how to set up my sql query or should i make several querys can any1 point me in the right direction.\n\nI want to output the last 10 writes in my database. For example i would have a table with users and a table with posts. consider this example.\n\nusers.id, users.firstname, users.joindate, users.profilepicture, users.picturesetdate\n\nPosts.id, Posts.users_id, posts.message, post.postdate\n\nI would want to output the last 10 changes. For instance\n\nFirstname changed his profilepicture on 6-12-2016\nFirstname posted a message on 5-12-2016\nFirstname Joined the website on 4-12-2016\n\nWhat would i need to do to get this information in the same query cus i would need to group Firstname, Profilepicture and picturesetdate. Firstname, message,postdate. Firstname, joindate\n    ",
    title: "activity feed, php mysql",
    id: 453,
    PostTypeId: 1,
    bounty: 0.12487017559058788,
    UserId: 98,
    viewCount: 2,
    upvoteCount: 25,
    comments: 1
  },
  {
    body:
      "\nYou can set this up fairly easily using 2 queries:\n\nYou can query your posts first and get all the columns you need:\n\n$sql = \"SELECT id, users_id, message, postdate from posts ORDER BY postdate DESC LIMIT 10\";\n$res_a = mysqli_query($mysqli, $sql) or die (mysqli_error($mysqli));\n\n\nThen start a loop displaying the results, and within that loop you can query the users table using 'users_id' from the posts table.\n\nforeach ($res_a as $res) { \n\n// Get user ID from posts table\n$userid = $res['users_id'];\n\n// Query the users table\n$user_sql = \"SELECT id, firstname, joindate, profilepicture, picturesetdate FROM users WHERE id = '$userid'\";\n$user_res = mysqli_query($mysqli, $user_sql) or die (mysqli_error($mysqli));\n$user = $user_res->fetch_assoc();\n\n\nThen you can simply assign each result to a variable:\n\n$first_name = $user['firstname'];\n$profile_photo = $user['profilepicture'];\n// etc..\n\n    ",
    id: 454,
    PostTypeId: 2,
    PostId: 453,
    bounty: 0.12487017559058788,
    UserId: 45,
    upvoteCount: 27
  },
  {
    body:
      "\n\nHere are two fonctions which (I thought) should do the same thing but actually do not.\n\nIt seems that with the list comprehension, the index taken is the first that could correspond, so when you have the same value at different index, there is an ambiguity. \n\nIs there a way to modify the list comprehension in filter2 so get the same result as in filter1 ? \n\n  L = [98.75011926342906,\n 97.8178200008178,\n 98.6138182016438,\n 98.55520874507613,\n 98.25262038791283,\n 98.75011926342906,\n 99.06770073738875,\n 98.66970163697574,\n 98.56611283001895,\n 98.47751713985852, \n 98.66970163697574,\n 97.8178200008178]\n\n\ndef filter1(L, threshold=98.7):\n    items = []\n    for i in range(len(L)):\n        if L[i] < threshold:\n            items.append(i)\n    return items\n\ndef filter2(L, threshold=98.7):\n    items = [L.index(x) for x in L if  x <= threshold]\n    return items\n\nprint filter1(L)\n>>> [1, 2, 3, 4, 7, 8, 9, 10, 11]\nprint filter2(L)\n>>> [1, 2, 3, 4, 7, 8, 9, 7, 1]\n\n    ",
    title: "Getting index with list comprehension in a list in Python",
    id: 455,
    PostTypeId: 1,
    bounty: 0.5848505891505915,
    UserId: 39,
    viewCount: 5,
    upvoteCount: 37,
    comments: 3
  },
  {
    body:
      "\nYou can use enumerate as a helper here:\n\nbad_items = [i for i, x in enumerate(L) if x <= threshold]\n\n\nenumerate will give you pairs of (index, value) which you can unpack in comprehension (into i, x).  Then you only take i if x <= threshold.\n    ",
    id: 456,
    PostTypeId: 2,
    PostId: 455,
    bounty: 0.5848505891505915,
    UserId: 74,
    upvoteCount: 15
  },
  {
    body:
      "\nThe reason you have index 7 instead of 10 is because you have duplicate elements and index returns the smallest index at which the value is present. Besides, searching for the index takes linear time too. Your whole loop is being quadratic.\n    ",
    id: 457,
    PostTypeId: 2,
    PostId: 455,
    bounty: 0.5848505891505915,
    UserId: 90,
    upvoteCount: 23
  },
  {
    body:
      "\nYou can use enumerate, which assigns the position of the loop into i, x is assigned with the current value.\n\ndef filter2(L, threshold=98.7):\n    items = [i for (i, x) in enumerate(L) if x <= 98.7]\n    return items\n\n    ",
    id: 458,
    PostTypeId: 2,
    PostId: 455,
    bounty: 0.5848505891505915,
    UserId: 24,
    upvoteCount: 34
  },
  {
    body:
      "\n\nIn web based React our props have context, which can be set and in used as dependency injection mechanism. I would like to do something similar in React native app. Is there any way to do that? \n    ",
    title: "Using context in React Native",
    id: 459,
    PostTypeId: 1,
    bounty: 0.9561340627730455,
    UserId: 83,
    viewCount: 3,
    upvoteCount: 14,
    comments: 1
  },
  {
    body:
      "\nReact Native uses the same react package used for web applications. All React Native components work in the same way as the React ones (in terms of creation, lifecycle and the API, the main difference being that they do not render HTML elements, but custom components that then talk to the OS API), so you can use context in the same way you do in React. In fact, the F8 App makes use of the context functionality in order to handle the back button in Android. Have a look at the source code.\n    ",
    id: 460,
    PostTypeId: 2,
    PostId: 459,
    bounty: 0.9561340627730455,
    UserId: 61,
    upvoteCount: 23
  },
  {
    body:
      '\n\nI am a beginner with Telegraf, and I would like to install an "input plugin". I have the configuration and the .go file but I do not know what to do with it, even after searching on Google.\n\nThank you in advance !\n    ',
    title: "Telegraf : How to add a &quot;input plugin&quot;?",
    id: 461,
    PostTypeId: 1,
    bounty: 0.9741595965638385,
    UserId: 62,
    viewCount: 1,
    upvoteCount: 2,
    comments: 2
  },
  {
    body:
      '\nTelegraf stuff is installed at /etc/telegraf folder and the default configuration file is /etc/telegraf/telegraf.conf.\n\nInside this file, you can define the input and output plugins. See Telegraf doc for more or inside the file (which is created for you for free when you install Telegraf). \n\nThere\'s another folder: /etc/telegraf/telegraf.d\n\nIf you put any custom configuration files there, Telegraf will pick it and it\'ll help you in structuring the conf files better.\n\nSo, in my case, I have the default /etc/telegraf/telegraf.conf file and I have also created two other conf files inside /etc/telegraf/telegraf.d folder.\n\n/etc/telegraf/telegraf.d folder/myCompany-preferred-output-plugin.conf\n/etc/telegraf/telegraf.d folder/myCustom-host-specific-inputs-procstat-plugin.conf\n/etc/telegraf/telegraf.d folder/myCustom-inputs-exec-plugin.conf\n\n\nTo enable a plugin for example [[inputs.procstat]] in my case:\n\nI have the following lines in it:\n\n[[inputs.procstat]]\n  exe = "jenkins"\n  prefix = "pgrep_serviceprocess"\n\n[[inputs.procstat]]\n  exe = "telegraf"\n  prefix = "pgrep_serviceprocess"\n\n[[inputs.procstat]]\n  exe = "sshd"\n  prefix = "pgrep_serviceprocess"\n\n[[inputs.procstat]]\n  exe = "dockerd"\n  prefix = "pgrep_serviceprocess"\n\n## etc etc\n\n\nSimilarly for [[inputs.exec]] plugin, I have the other file.\nFor ex: You can refer this link for [[inputs.exec]] example.\n\nAfter that, just do:\n\n$ sudo service telegraf restart; sleep 2\n$ sudo service telegraf status\n$ tail -f /var/log/telegraf/telegraf.log \n\n\nAlso refer this post: How to add a plugin to Telegraf?\n    ',
    id: 462,
    PostTypeId: 2,
    PostId: 461,
    bounty: 0.9741595965638385,
    UserId: 90,
    upvoteCount: 25
  },
  {
    body:
      "\nYou can get more information about creating plugins for Telegraf over here: \n\nhttps://github.com/influxdata/telegraf/blob/master/CONTRIBUTING.md\n\nCurrently you will have to get the telegraf code from the git and re-compile it with your plugin to make your plugin work. After writing your plugin code, make sure you include it to the telegraf/plugin/inputs/all/all.go file and then make the new telegraf binary file.\n    ",
    id: 463,
    PostTypeId: 2,
    PostId: 461,
    bounty: 0.9741595965638385,
    UserId: 6,
    upvoteCount: 12
  },
  {
    body:
      "\n\n\n    This question already has an answer here:\n    \n        \n            Interaction between forms — How to change a control of a form from another form?\n                \n                    1 answer\n                \n        \n    \n    \nI have 2 forms: a main form and a second form with only a listview in which users can make a selection. Once the listview item is activated with a double click, I want a label on the main form to display the text of the item that was activated. Here is my code (not working); why is this wrong? Thanks\n\nMain Form:\n\npublic partial class MainForm : Form\n{\n    public MainForm()\n    {\n        InitializeComponent();\n    }\n\n    /* for populating the process list when the user clicks display process button */\n    private void DisplayProcessButton_Click(object sender, EventArgs e)\n    {\n        Process_List plopen = new Process_List();\n        plopen.Show();\n\n        Process[] process = Process.GetProcesses();\n        foreach (Process prs in process) \n        {\n            plopen.listView1.Items.Add(prs.ProcessName);\n        } \n    }\n\n\nSecond Form:\n\nprivate void listView1_ItemActivate(object sender, EventArgs e)\n{\n    MainForm mf = new MainForm();\n    mf.label1.Text = e.ToString();\n    Close();\n}\n\n    ",
    title: "Change Label Text via ListView ItemActivate",
    id: 464,
    PostTypeId: 1,
    bounty: 0.6331731709515702,
    UserId: 69,
    viewCount: 8,
    upvoteCount: 13,
    comments: 1
  },
  {
    body:
      "\nHere's what you should do! On your second form, do this\n\npublic MainForm parentForm;\npublic void SecondForm(MainForm form)\n{\n    InitializeComponent();\n    parentForm = form;\n}\n\n\nAnd...\n\nprivate void listView1_ItemActivate(object sender, EventArgs e)\n{\n    parentForm.label1.Text = e.ToString();\n}\n\n\nThen in your main form...\n\npublic SecondForm secondform;\npublic void MainForm()\n{\n    InitializeComponent();\n    secondform = new SecondForm(this);\n}\n\n\nAnd when you open your SecondForm use this wherever you want!\n\nsecondform.Show();\n\n\nBy doing this, you can transfer information form form to form back and forth. I use this all the time with every one of my forms. It's very very useful! If you have any questions please let me know!\n    ",
    id: 465,
    PostTypeId: 2,
    PostId: 464,
    bounty: 0.6331731709515702,
    UserId: 17,
    upvoteCount: 10
  },
  {
    body:
      '\n\nWhen the polygon is a axis-aligned-box "POLYGON((0 0,1 0,1 1,0 1))", then union_() won\'t give a correct result, just empty output. Actually, union_() of any polygon should not be empty.\n\nBut if you change the polygon green from axis-aligned-box to "POLYGON((2 1.3,2.4 1.7,2.8 1.8))", then there comes out a meaningful output (not empty).\n\nIs it a bug of boost union_()?\n\nMany thanks\n\nint main()\n{\n    typedef boost::geometry::model::polygon<boost::geometry::model::d2::point_xy<double> > polygon;\n\n    polygon green, blue;\n\n    boost::geometry::read_wkt(\n        "POLYGON((0 0,1 0,1 1,0 1))",\n        green);\n\n    boost::geometry::read_wkt(\n        "POLYGON((2 1.3,2.4 1.7,2.8 1.8))",\n        blue);\n\n    std::deque<polygon> output;\n    boost::geometry::union_(green, blue, output);\n\n    int i = 0;\n    std::cout << "green && blue:" << std::endl;\n    BOOST_FOREACH(polygon const& p, output)\n    {\n        std::cout << i++ << ": " << boost::geometry::area(p) << std::endl;\n    }\n\n    return 0;\n}\n\n    ',
    title:
      "Why boost::geometry::union_ can&#39;t give result for axis-aligned-box?",
    id: 466,
    PostTypeId: 1,
    bounty: 0.042510514180013725,
    UserId: 76,
    viewCount: 5,
    upvoteCount: 29,
    comments: 1
  },
  {
    body:
      "\nThere is a simmilar question about it. The algoritm requires some preconditions.\n1) The polygon has to be clockwise.\n2) The polygon has bo be closed, i.e. the last point just coincides the first point.\n\nSo to correct the issues in the orignial polygon data, call boost::geometry::correct() to make the data meets the rules. And the algorithm wil accept the polygon and gives the correct result.\n\nWhy boost::geometry::intersection does not work correct?\n    ",
    id: 467,
    PostTypeId: 2,
    PostId: 466,
    bounty: 0.042510514180013725,
    UserId: 98,
    upvoteCount: 36
  },
  {
    body:
      "\n\nI am trying to use ReadyRoll project for automated deployments. the previous project that I created had the following IF TYPE_ID(N'[dbo].[abc_PrintType]')  IS NULL, in the first migration script that was generated after importing the database. I want to know which option to check in the properties of the project to generate the same line of code,\n\nGO\nPRINT N'Print types'\nGO\nIF TYPE_ID(N'[dbo].[abc_PrintType]') IS NULL\nCREATE TYPE [dbo].[abc_PrintType] AS TABLE\n(...)\n\n    ",
    title: "ReadyRoll Project: SemVer Option",
    id: 468,
    PostTypeId: 1,
    bounty: 0.7719947986998443,
    UserId: 37,
    viewCount: 5,
    upvoteCount: 30,
    comments: 1
  },
  {
    body:
      '\nThe option you\'re looking for is Add object existence checks.\n\nThis can be enabled in your project by adding the following code under the <Project> node within the .sqlproj file:\n\n<PropertyGroup>\n  <!-- "Add object existence checks" SQL Compare option -->\n  <SyncOptionIncludeExistenceChecks>True</SyncOptionIncludeExistenceChecks>\n</PropertyGroup>\n\n\nThe next time you import a change, the generated script will include the IF EXISTS... style guard clauses.\n\nMore information on how to configure this can be found in the ReadyRoll documentation:\nhttps://documentation.red-gate.com/pages/viewpage.action?pageId=42539778\n    ',
    id: 469,
    PostTypeId: 2,
    PostId: 468,
    bounty: 0.7719947986998443,
    UserId: 5,
    upvoteCount: 2
  },
  {
    body:
      '\n\nI have a data set customerId, transactionDate, productId, purchaseQty loaded into a data.table. for each row, I want to calculate the sum, and mean of purchaseQty for the prior 45 day\n\n        productId customerID transactionDate purchaseQty\n 1:    870826    1186951      2016-03-28      162000\n 2:    870826    1244216      2016-03-31        5000\n 3:    870826    1244216      2016-04-08        6500\n 4:    870826    1308671      2016-03-28      221367\n 5:    870826    1308671      2016-03-29       83633\n 6:    870826    1308671      2016-11-29       60500\n\n\nI\'m looking for an output like this:\n\n    productId customerID transactionDate purchaseQty    sumWindowPurchases\n 1:    870826    1186951      2016-03-28      162000                162000\n 2:    870826    1244216      2016-03-31        5000                  5000\n 3:    870826    1244216      2016-04-08        6500                 11500\n 4:    870826    1308671      2016-03-28      221367                221367\n 5:    870826    1308671      2016-03-29       83633                305000\n 6:    870826    1308671      2016-11-29       60500                 60500\n\n\nso, sumWindowPurchases contains the sum of purchaseQty for the customer/product over a 45 day window from the current transaction date. Once i have that working, throwing the mean, and other calcs I need should be trivial\n\nI went back to my SQL roots and thought of a self join:\n\nselect   DT.customerId, DT.transactionDate, DT.productId, sum(DT1.purchaseQty)\nfrom     DT\n         inner join DT as DT1 on \n             DT.customerId = DT1.customerId\n             and DT.productId =  DT1.productId\n             and DT1.transactionDate between DT.transactionDate and dateadd(day, -45, DT.transactionDate)\n\n\nTrying to translate that into R using data.dable syntax, I was hoping to do something like this:\n\nDT1 <- DT #alias. have confirmed this is just a pointer\nDT[DT1[DT1$transactionDate >= DT$transactionDate - 45],\n   .(sum(DT1$purchaseQty)), \n   by = .(DT$customerId , DT$transactionDate ), \n   on = .(customerId , DT1$transactionDate <= DT$TransactionDate), \n   allow.cartesian = TRUE]\n\n\nI guess I have a 2 part question. What is the "R way" to do this. Is a data.table self join the correct approach, or woudl i be better of trying to use the Reduce function?\n\nI suspect the self join is the only way to get the rolling 45 day window in there.  so part 2 is I need some help with the data.table syntax to explicitly reference which source table the column comes from, since its a self join and they have the same column names.\n\nIve been studying the answers that Frank linked to and have come up with this expression\n\nDT[.(p = productId, c = customerID, t = transactionDate, start = transactionDate - 45),\n        on = .(productId==p, customerID==c, transactionDate<=t, transactionDate>=start),\n        allow.cartesian = TRUE, nomatch = 0]\n\n\nwhich produces this output:\n\n   productId customerID transactionDate purchaseQty transactionDate.1\n1:    870826    1186951      2016-03-28      162000        2016-02-12\n2:    870826    1244216      2016-03-31        5000        2016-02-15\n3:    870826    1244216      2016-04-08        5000        2016-02-23\n4:    870826    1244216      2016-04-08        6500        2016-02-23\n5:    870826    1308671      2016-03-28      221367        2016-02-12\n6:    870826    1308671      2016-03-29      221367        2016-02-13\n7:    870826    1308671      2016-03-29       83633        2016-02-13\n8:    870826    1308671      2016-11-29       60500        2016-10-15\n\n\nThis is very close, to what i need to get to my final step. if i could sum the purchase quantities of this output, group by customer/product/transactionDate.1, i would have something useful. however, I cant get the syntax down for that, not do I understand where the transactionDate.1 name is coming from\n    ',
    title: "relative windowed running sum through data.table non-equi join",
    id: 470,
    PostTypeId: 1,
    bounty: 0.1070947485884659,
    UserId: 14,
    viewCount: 1,
    upvoteCount: 8,
    comments: 2
  },
  {
    body:
      '\nFirst, we find how many transaction dates occur in 45 day window prior to the current date (including current date)\n\nsetDT(df)\ndf[, n:= 1:.N - findInterval(transactionDate - 45, transactionDate), by=.(customerID)]\ndf\n#   productId customerID transactionDate purchaseQty n\n#1:    870826    1186951      2016-03-28      162000 1\n#2:    870826    1244216      2016-03-31        5000 1\n#3:    870826    1244216      2016-04-08        6500 2\n#4:    870826    1308671      2016-03-28      221367 1\n#5:    870826    1308671      2016-03-29       83633 2\n#6:    870826    1308671      2016-11-29       60500 1\n\n\nNext we find a rolling sum of purchaseQty with window size n. Adopting a great answer here\n\ng <- function(x, window){\n  b_pos <- seq_along(x) - window + 1  # begin positions\n  cum <- cumsum(x)\n  cum - cum[b_pos] + x[b_pos]\n}\ndf[, sumWindowPurchases := g(purchaseQty, n),][,n:=NULL,]\ndf\n#   productId customerID transactionDate purchaseQty sumWindowPurchases\n#1:    870826    1186951      2016-03-28      162000             162000\n#2:    870826    1244216      2016-03-31        5000               5000\n#3:    870826    1244216      2016-04-08        6500              11500\n#4:    870826    1308671      2016-03-28      221367             221367\n#5:    870826    1308671      2016-03-29       83633             305000\n#6:    870826    1308671      2016-11-29       60500              60500\n\n\n\n\nData\n\nstructure(list(productId = c(870826L, 870826L, 870826L, 870826L, \n870826L, 870826L), customerID = c(1186951L, 1244216L, 1244216L, \n1308671L, 1308671L, 1308671L), transactionDate = structure(c(16888, \n16891, 16899, 16888, 16889, 17134), class = "Date"), purchaseQty = c(162000L, \n5000L, 6500L, 221367L, 83633L, 60500L)), .Names = c("productId", \n"customerID", "transactionDate", "purchaseQty"), row.names = c("1:", \n"2:", "3:", "4:", "5:", "6:"), class = "data.frame")\n\n    ',
    id: 471,
    PostTypeId: 2,
    PostId: 470,
    bounty: 0.1070947485884659,
    UserId: 38,
    upvoteCount: 40
  },
  {
    body:
      '\nThis also works, it could be considered simpler. It has the advantage of not requiring a sorted input set, and has fewer dependencies.\n\nI still don\'t know understand why it produces 2 transactionDate columns in the output. This seems to be a byproduct of the "on" clause. In fact, columns and order of the output seems to append the sum after all elements of the on clause, without their alias names\n\nDT[.(p=productId, c=customerID, tmin=transactionDate - 45, tmax=transactionDate),\n    on = .(productId==p, customerID==c, transactionDate<=tmax, transactionDate>=tmin),\n    .(windowSum = sum(purchaseQty)), by = .EACHI, nomatch = 0]\n\n    ',
    id: 472,
    PostTypeId: 2,
    PostId: 470,
    bounty: 0.1070947485884659,
    UserId: 42,
    upvoteCount: 34
  },
  {
    body:
      "\n\nTargeting iOS 9+, with Swift 3\n\nMy app makes use of hundreds (and potentially thousands) of Swift classes.\n\nEach class is responsible for drawing a specific piece of vector artwork. The artwork is created in Sketch, and exported as a Swift class using the PaintCode plugin. Each class can be quite complex and lengthy, with a lot of data. The class file is then fed to an automated command-line tool that writes app-specific functionality in to the file, allowing the art to become interactive and flexible. The resulting Swift file is added to the app's Xcode project.\n\nAs Swift does not allow for Objective-C style dynamic loading/creation of classes by name (feel free to correct), my app adds the processed Swift class to a lookup table of drawing classes. When the app needs to draw a specific piece of artwork, the class lookup table is read, the relevant class is returned, and is then used to draw the art.\n\nI am concerned that this approach may not be viable once the project ramps up to full-scale production, at which point hundreds or thousands of classes will be generated. Possible problems include:\n\n\ncompilation times\ncode size\napp loading times\nXcode/SourceKitServer stability/meltdowns\n\n\nTo that end, I'd like advice on overcoming possible problems before they become deal-breakers.\n\nSpecifically:\n\nQ. what approach should I take to minimise re-compilation? Is it viable to bundle groups of classes together in Frameworks or other mechanisms?\n\nQ. same thing for code size and app loading times. How can I group my code so I can more easily lazy-load groups of classes on demand? Would Frameworks help solve these problems?\n\nAny advice, or other considerations I may have missed, is appreciated.\n\n[Edit - many months and a lot of work later]\n\nFor the reasons outlined above, I abandoned attempts to us PaintCode or other art-as-code solutions.\n\nAlthough these products are perfectly fine for small numbers of art pieces, the system does not scale well to large production, and certainly not for Swift and the state of its support in Xcode 8.\n\nInstead, I adopted a file-based approach where artwork is prepared in Sketch, and layers are marked-up with drawing information. These are exported as SVGs. The engine loads an SVG on-demand, parses it, and the mark-up is used to indicate/direct app-specific logic and drawing. Due to the amount of work involved, this is not viable for small numbers of art pieces -- stick to PaintCode instead -- but once done it allows a great amount of flexibility and speed, without all the Xcode and sourcekitservice crashes.\n\nThis approach allows the art assets to be wrangled like they normally are: grouped in folders, loaded-on-demand, cached, released etc.\n    ",
    title: "Handling Very Large Numbers of Swift Classes",
    id: 473,
    PostTypeId: 1,
    bounty: 0.6643358144940348,
    UserId: 21,
    viewCount: 1,
    upvoteCount: 17,
    comments: 1
  },
  {
    body:
      "\nI'm all for swift, but given the constraints you mention, objc is probably your tool for this type of task. Alternately you could come up with a scripting solution. A couple thoughts: \n\n\nYou should rasterize your art: Why'd you code it? The platform, and every technology you mention is an apple technology, it therefore helps to use their apps as guides: every apple app utilizes either built in controls, or an overwhelming number of rasterized graphics. (examples include: Logic Studio, Window Server (Aqua), garage band, Calendar, etc.) this is because bitmap manipulation is FAST. The millions of UIBeziers in your thousands of classes are a thousand times more complex and could trash your performance because all that math would have to be done on the cpu as opposed to simple bitmap stretches on the gpu. Apple has discussed this at length in cocoa sessions.\nThe Swift runtime isn't mature enough to handle code unloading. You can ostensibly call dlopen() on a swift dylib, and it should work, but it would be very different than working with real swift classes. Swift doesn't have the dynamicism to support this. You also can not call dlclose(). Apple's Swift Bug Tracker explicitly says dlclose is not supported. (In fact, they say they won't support it!)  So if you really have thousands of huge classes, once they're loaded, you wouldn't be able to reliably unload them. In swift, therefore you can't solve the problem like this.\nIf you insist on doing things this way, you ought to investigate offloading CGGraphicsContext work to other threads right from the get go, because you're going to have to manage quite a bit of work that is designed to happen on the main thread. I doubt paint code emit the right code to handle this case.  \n\n    ",
    id: 474,
    PostTypeId: 2,
    PostId: 473,
    bounty: 0.6643358144940348,
    UserId: 60,
    upvoteCount: 32
  },
  {
    body:
      '\n\nI am currently trying to enable A.cpp from A folder to use a function func() defined in B.cpp from B folder.\n\nThe top level Makefile shows:   DEPENDS = ... B A ....\n\nAlthough I know very little about Makefiles, my boss told me the above Makefile statement indicates some hierarchy and dependency of the entire project. So I could not directly call func() defined in B.cpp from A.cpp. And he said I was silly to try to copy the entire dependency from B folder to A folder earlier. At last, he suggested me to use "Call back function"  in this situation. \n\nNow my basic understand of "Call back function" is that I need to pass "func" as an argument (pointer to func()) to some functions in A.cpp. However, I don\'t quite understand the motivation of using "callback function" in my case and how to realize it.\n\nCould anybody give me some instructions? Thanks :-)\n\nSo I did the following things: \n\n/* Inside /A/A.h */ \n typedef void(*PTR_FUNC_B)();\n void SetCB(PTR_FUNC_B fn);  \n\n /* Inside /A/A.cpp  */\n PTR_FUNC_B myFn;\n void SetCB(PTR_FUNC_B fn) {myFn = fn}\n some_func_of_A () {\n       myFn()             // segmentation fault\n }\n\n /* Inside /B/B.cpp  */\n void func_b() {\n    std::printf("Invoke callback function.");\n }\n void register_cb() {\n    SetCB(func_b);\n } \n\n\nIs my understanding of callback functions correct? I am glad I can compile it successfully, but I got "segmentation fault accessing address 0".\n    ',
    title:
      "How to implement C++ call back functions for multiple source files?",
    id: 475,
    PostTypeId: 1,
    bounty: 0.12764202872000774,
    UserId: 23,
    viewCount: 6,
    upvoteCount: 19,
    comments: 0
  },
  {
    body:
      '\n\nI am having a problem in this output. It seems to mostly working but I am missing a step somewhere.\n\nIn the below code:\nK4 to K7 is number codes and l4 to l7 is some word names - 4 records\nIm trying to output this to PDF and it should only have 4 records however for some reason it outputs repeated versions, 16 in total. I know the loops are wrong. Anyway to fix this?\n\nSub foreachtest2()\nApplication.ScreenUpdating = False\nDim c As Range\nDim f As Range\n\n\n\nSheets("Lookup Table").Range("K4:K7").Name = "Rng"\nSheets("Lookup Table").Range("L4:L7").Name = "RngName"\n\n\nFor Each c In Range("Rng")\n    For Each f In Range("RngName")\n\n    Sheets("Site Report").Select\n    Range("D7").Select\n    ActiveCell.FormulaR1C1 = c.Value\n\n\n\n\nSheets("Site Report").Select\n Range("A1:M78").Select\n ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, Filename:= _\n        "C:\\path" & f.Value & c.Value & ".pdf", Quality:=xlQualityStandard, _\n        IncludeDocProperties:=True, IgnorePrintAreas:=False\n\nNext\nNext\n\n\n  Application.ScreenUpdating = True\n\nEnd Sub\n\n    ',
    title: "VBA nesting for each for PDF",
    id: 476,
    PostTypeId: 1,
    bounty: 0.12027654984282021,
    UserId: 89,
    viewCount: 9,
    upvoteCount: 27,
    comments: 1
  },
  {
    body:
      "\nYou dont need two loops, just one to iterate on the K column. At each iteration you retrieve the corresponding value in L by using ``Offset.\n\nFor Each c In Range(\"Rng\")\n    Set f  = c.Offset(, 1)\n    ' ...\n    ' do the work. I cant verify if the code inside your loop\n    ' does the intended work. But this quick fix should solve the\n    ' 16 values issue. Now you should have only 4 records to work on. \nNext\n\n    ",
    id: 477,
    PostTypeId: 2,
    PostId: 476,
    bounty: 0.12027654984282021,
    UserId: 89,
    upvoteCount: 2
  },
  {
    body:
      '\n\nI\'m trying to install pyicu for python 3.5 on mac according to this link\nhttps://struggley.wordpress.com/2015/07/14/installation-pyicu-on-mac-osx-yosemite/\n\nHowever, when I excute pip3 install pyicu, I got this error\n\nCollecting pyicu\nUsing cached PyICU-1.9.5.tar.gz\nComplete output from command python setup.py egg_info:\nTraceback (most recent call last):\n  File "<string>", line 1, in <module>\n  File "/private/var/folders/70/jlxmpp0n003805pmw6tfc0r80000gn/T/pip-build-7eusuic1/pyicu/setup.py", line 11, in <module>\n    ICU_VERSION = subprocess.check_output((\'icu-config\', \'--version\')).strip()\n  File "/usr/local/Cellar/python3/3.5.2_3/Frameworks/Python.framework/Versions/3.5/lib/python3.5/subprocess.py", line 626, in check_output\n    **kwargs).stdout\n  File "/usr/local/Cellar/python3/3.5.2_3/Frameworks/Python.framework/Versions/3.5/lib/python3.5/subprocess.py", line 693, in run\n    with Popen(*popenargs, **kwargs) as process:\n  File "/usr/local/Cellar/python3/3.5.2_3/Frameworks/Python.framework/Versions/3.5/lib/python3.5/subprocess.py", line 947, in __init__\n    restore_signals, start_new_session)\n  File "/usr/local/Cellar/python3/3.5.2_3/Frameworks/Python.framework/Versions/3.5/lib/python3.5/subprocess.py", line 1551, in _execute_child\n    raise child_exception_type(errno_num, err_msg)\nFileNotFoundError: [Errno 2] No such file or directory: \'icu-config\'\n\n\nI guess it\'s because I didn\'t set the path for icu-config correctly. I think the following two may be the icu-config files.\n\n/usr/local/Cellar/icu4c/58.1/bin/icu-config\n/usr/local/Cellar/icu4c/58.1/share/man/man1/icu-config.1\n\n\nHowever, I have no idea how to set the path to it. Besides, I don\'t know why I got this error while the tutorial can work smoothly.\n    ',
    title: "Can&#39;t install pyicu due to &#39;icu-config&#39;",
    id: 478,
    PostTypeId: 1,
    bounty: 0.4593835537291022,
    UserId: 65,
    viewCount: 3,
    upvoteCount: 8,
    comments: 1
  },
  {
    body:
      "\nI had the same problem. This worked for me\n\nbrew install intltool icu4c gettext\nbrew link icu4c gettext --force\nCFLAGS=-I/usr/local/opt/icu4c/include LDFLAGS=-L/usr/local/opt/icu4c/lib pip3 install pyicu\n\n\nSource: https://github.com/Homebrew/legacy-homebrew/issues/34170\n    ",
    id: 479,
    PostTypeId: 2,
    PostId: 478,
    bounty: 0.4593835537291022,
    UserId: 96,
    upvoteCount: 22
  },
  {
    body:
      "\n\nOn the Firebase Analytics Dashboard they display summary data for device and OS breakdown but it does not show the complete breakdown (in my case meaning I can't view the breakdown for 44.7% of my user base). Is there anywhere in Firebase I can either view this information or export it to view it somewhere else?\n\n\n    ",
    title: "View full device breakdown in Firebase",
    id: 480,
    PostTypeId: 1,
    bounty: 0.047769603457473275,
    UserId: 77,
    viewCount: 2,
    upvoteCount: 19,
    comments: 1
  },
  {
    body:
      "\nIt's a bit tedious, but you can add a filter on the dashboard to see the usage numbers for each device and each iOS version. Click Filters → User Property → Device Model or Filters → User Property → OS Version to filter to a single device or OS.\n\nIf you record or export the numbers for each device and OS, you can work out the percentage distribution.\n\n\n    ",
    id: 481,
    PostTypeId: 2,
    PostId: 480,
    bounty: 0.047769603457473275,
    UserId: 30,
    upvoteCount: 37
  },
  {
    body:
      '\n\nI have a trustStore that contains the certificate\n\nKeystore type: JKS\nKeystore provider: SUN\n\nYour keystore contains 2 entries\n\nAlias name: mykey\nCreation date: 06/12/2016\nEntry type: trustedCertEntry\n\nOwner: CN=***, O=***, L=***, ST=Ohio, C=US, SERIALNUMBER=***, OID.2.5.4.15=Private Organization\n, OID.1.3.6.1.4.1.311.60.2.1.2=Ohio, OID.1.3.6.1.4.1.311.60.2.1.3=US\nIssuer: CN=Go Daddy Secure Certificate Authority - G2, OU=http://certs.godaddy.com/repository/, O="GoDaddy.com, Inc.", L=Scottsdale, ST=Arizona, C=US\nSerial number: ****\nValid from: Thu Jan 22 14:41:41 BRST 2015 until: Tue Jan 24 16:40:54 BRST 2017\n(...)\n\n\nThen I have the SAAJ code to perform the request (I am using IBM JDK)\n\nSystem.setProperty("javax.net.ssl.trustStore","keystore.jks");\nSystem.setProperty("javax.net.ssl.trustStorePassword","****");\nSystem.setProperty("com.ibm.ssl.performURLHostNameVerification", "true");\nSystem.setProperty("java.protocol.handler.pkgs","com.ibm.net.ssl.internal.www.protocol");\n\n    Security.addProvider(new com.ibm.jsse.IBMJSSEProvider());\n\n    // Create SOAP Connection\n    SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();\n    SOAPConnection soapConnection = soapConnectionFactory.createConnection();\n\n    String url = "https://****";\n    SOAPMessage soapResponse = soapConnection.call(createSOAPRequest(), url);\n\n\nBut I am getting the error message\n\n[ERROR ] SAAJ0009: Message send failed\n[err] Error occurred while sending SOAP Request to Server\n[err] com.sun.xml.internal.messaging.saaj.SOAPExceptionImpl: com.sun.xml.internal.messaging.saaj.SOAPExceptionImpl: Message send failed\n[err] at com.sun.xml.internal.messaging.saaj.client.p2p.HttpSOAPConnection.call(Unknown Source)\n[err] at wasdev.sample.servlet.SimpleServlet.tryMe(SimpleServlet.java:79)\n[err] at wasdev.sample.servlet.SimpleServlet.doGet(SimpleServlet.java:206)\n[err] at javax.servlet.http.HttpServlet.service(HttpServlet.java:687)\n[err] at javax.servlet.http.HttpServlet.service(HttpServlet.java:790)\n[err] at com.ibm.ws.webcontainer.servlet.ServletWrapper.service(ServletWrapper.java:1290)\n[err] at [internal classes]\n[err] at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)\n[err] at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)\n[err] com.sun.xml.internal.messaging.saaj.SOAPExceptionImpl: Message send failed\n[err] Caused by:\n[err] at java.lang.Thread.run(Unknown Source)\n[err] at com.sun.xml.internal.messaging.saaj.client.p2p.HttpSOAPConnection.post(Unknown Source)\n[err] Caused by:\njava.security.cert.CertPathValidatorException: The certificate issued by CN=Go Daddy Secure Certificate Authority - G2, OU=http://certs.godaddy.com/repository/, O="GoDaddy.com, Inc.", L=***, ST=Arizona, C=US is not trusted; internal cause is:\n[err] ... 30 more\n[err] at com.ibm.jsse2.as.a(Unknown Source)\njava.security.cert.CertPathValidatorException: Certificate chaining error\n(...)\n\n\nMy feeling is that I am missing some step here.\n\nI am running a bluemix liberty runtime.\n    ',
    title: "SOAP request using client certificate",
    id: 482,
    PostTypeId: 1,
    bounty: 0.35848091246328684,
    UserId: 53,
    viewCount: 1,
    upvoteCount: 10,
    comments: 0
  },
  {
    body:
      '\n\nI\'m writing a gui program that basically removes and adds jpanels when certain buttons are clicked.  I\'m trying to create a hierarchy of jpanels:\nHere\'s the hierarchy\n\nOpener\n  Mammal\n    Tiger\n      Tiger_caged //terminating button\n      Tiger_riding //terminating button\n  Reptile\n    Frog\n      Frog_eating //terminating button\n      Frog_null //terminating button\n\nThe initial jpanel is opener which is added to the JFrame on start up.\nOpener will have mammal and reptile.\nEach of those buttons, when clicked, will call swap(currentJPanel), which then calls removeall(), repaint(), and revalidate() then adds the next JPanel under them with x buttons, each which calls swap(currentJPanel) method.  This will continue until until you reach the terminating JPanel with buttons that, when clicked, does x action, and then calls reset() which asks if the user wants to continue the game or get the result.  If continue game is selected, then removeall(), repaint(), revalidate() and add opener again.\n\nI created a jPanel called content to place each of my JPanels in, added opener to content, and added content to the JFrame.  The buttons that are not in opener should not be added to the JFrame until a certain button is clicked.  Below is my current code.  When I run the gui, all of the buttons I have created are visible.  Only buttons Reptile and Mammal should be visible on startup.  Also, when one of the buttons are clicked, nothing is removed or added.  The only button that works currectly is the getResult button, which is the only one that doesn\'t call swap().  My initial thought is that I can\'t pass a jButton to a method but no error comes up when I call swap() so I\'m not sure.  Any help and/or suggestions would be greatly appreciated.\n\n\n\nimport java.awt.*;\nimport java.awt.event.*;\nimport javax.swing.*;\nimport javax.swing.event.*;\n\npublic class DreamInterpreter extends JFrame implements ActionListener{\n   private final LayoutManager layoutMain;\n\n   private String result = "";\n   private JLabel question = new JLabel("What was in your dream?");\n   private String reset = "What was in your dream?";\n   private JTextArea showResult;\n\n//BUTTONS\n   private JButton exit = new JButton("Exit");\n   private JButton getResult= new JButton("INTERPRET MY DREAM");\n   private JButton continueGame = new JButton("Add more to my dream");\n\n   private JButton animal = new JButton("Animal");\n      private JButton mammal = new JButton("Mammal");\n         private JButton tiger= new JButton("Tiger");\n         private JButton tiger_caged= new JButton("The tiger is in a cage");\n         private JButton tiger_riding= new JButton("The tiger is being ridden");\n      private JButton reptile = new JButton("Reptile");\n         private JButton frog= new JButton("Frog");\n         private JButton frog_eating= new JButton("Eating");\n         private JButton frog_null= new JButton("None of these");\n   private JButton person = new JButton("Person");\n   private JButton location = new JButton("Location");\n\n\n//PANELS\n\n   //DEFAULT PANEL\n   JPanel standard;\n   JPanel content;\n\n   JPanel opener;\n   JPanel jContinueGame;\n   \n   JPanel jAnimal, jPerson, jLocation;\n      JPanel jMammal, jReptile;\n         JPanel jTiger;\n         JPanel jFrog;\n   \n\n   public DreamInterpreter(){\n\n      super("Dream Interpreter");\n      layoutMain = new BorderLayout(); // add components with add(component, BorderLayout.CENTER (NORTH, SOUTH, EAST, WEST)\n      setLayout(layoutMain);\n\n      exit.addActionListener(this);\n      getResult.addActionListener(this);\n      continueGame.addActionListener(this);\n\n      animal.addActionListener(this);\n      person.addActionListener(this);\n      location.addActionListener(this);\n\n      mammal.addActionListener(this);\n      reptile.addActionListener(this);\n\n      frog.addActionListener(this);\n      frog_eating.addActionListener(this);\n      frog_null.addActionListener(this);\n\n      tiger.addActionListener(this);\n      tiger_caged.addActionListener(this);\n      tiger_riding.addActionListener(this);\n\n//FORMATTING LAYOUT\n      showResult = new JTextArea(15,20);\n//DEFAULT\n      standard = new JPanel();\n      standard.setLayout(new FlowLayout(FlowLayout.CENTER,10,8));\n//HEADER\n      JPanel header = new JPanel();\n      header.add(question);\n//OPENER\n      opener = standard;\n      opener.add(animal);\n      opener.add(location);\n      opener.add(person);\n//CONTENT\n      content = new JPanel();\n      content.add(opener);\n//CONTINUE GAME\n\n      jContinueGame = standard;\n      jContinueGame.add(continueGame);\n      jContinueGame.add(getResult);\n\n//DECLARE OTHER JPANELS\n      \n      jAnimal = jPerson = jLocation = standard;\n      jMammal = jReptile = standard;\n      jFrog = jTiger = standard;\n      \n      add(header, BorderLayout.NORTH);\n      add(content, BorderLayout.CENTER);\n      \n//ADDING\n\n   //jAnimal\n         jAnimal.add(mammal);\n         jAnimal.add(reptile);\n            jMammal.add(tiger);\n               jTiger.add(tiger_caged);\n               jTiger.add(tiger_riding);\n            jReptile.add(frog);\n               jFrog.add(frog_eating);\n               jFrog.add(frog_null);\n   //jPerson\n   //jLocation\n\n   }\n\n   public void actionPerformed(ActionEvent event){\n\n      if(event.getSource() == animal){\n         swap(jAnimal);\n         question.setText("What kind of animal was in your dream?");\n      }\n         if(event.getSource() == mammal){\n            swap(jMammal);\n            question.setText("What kind of mammal was in your dream?");\n         }\n            if(event.getSource() == tiger){\n               swap(jTiger);\n               question.setText("What was the tiger doing?");\n            }\n               if(event.getSource() == tiger_caged){\n                  result += "";\n                  reset();\n               }\n               if(event.getSource() == tiger_riding){\n                  result+="";\n                  reset();\n               }\n         if(event.getSource() == reptile){\n            swap(jReptile);\n            question.setText("What kind of reptile was in your dream?");\n         }\n            if(event.getSource()==frog){\n               swap(jFrog);\n            }\n               if(event.getSource()==frog_eating){\n                  result+="";\n                  reset();\n               }\n               if(event.getSource()==frog_null){\n                  result+="";\n                  reset();\n               }\n\n         if(event.getSource() == continueGame){\n            swap(opener);\n            question.setText("What was in your dream?");\n         }\n         if(event.getSource() == getResult){\n            content.removeAll();\n            content.revalidate();\n            content.repaint();\n            content.add(showResult);\n            showResult.setText(""+result);\n         }\n\n   }\n   public static void main(String[] args){\n      DreamInterpreter dreamInterpreter = new DreamInterpreter();\n      dreamInterpreter.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);\n      dreamInterpreter.setSize(450, 350);\n      dreamInterpreter.setVisible(true);\n   }\n\n   public void reset(){\n      content.removeAll();\n      content.revalidate();\n      content.repaint();\n      question.setText("What would you like to do?");\n      content.add(jContinueGame);\n   }\n   \n   public void swap(JPanel panel){\n      content.removeAll();\n      content.revalidate();\n      content.repaint();\n      content.add(panel);\n   }\n\n}\n\n\n\n    ',
    title: "Swapping jpanels on actionlistener event",
    id: 483,
    PostTypeId: 1,
    bounty: 0.6303942787410892,
    UserId: 22,
    viewCount: 6,
    upvoteCount: 38,
    comments: 1
  },
  {
    body:
      "\nAt a cursory look, I suspect your problem might be here:\n\n  //DECLARE OTHER JPANELS\n  jAnimal = jPerson = jLocation = standard;\n  jMammal = jReptile = standard;\n  jFrog = jTiger = standard;\n\n\nThe effect here is not to create multiple JPanels(), but rather to have all variables refer to the same JPanel instance. Therefore, when you add buttons using different variables, you're actually adding them to the same panel.\n    ",
    id: 484,
    PostTypeId: 2,
    PostId: 483,
    bounty: 0.6303942787410892,
    UserId: 28,
    upvoteCount: 24
  },
  {
    body:
      '\n\nI have a very simple HTML table which has one row and two cells. The first cell has a hyperlink which should cover both cells. How could I get my hyperlink to cover the second td of my table?\n\nHere is my HTML code:\n\n<table>\n  <tr>\n    <td style="width:100px;padding:0">\n      <a href="yes.htm" style="padding-top:0;padding-bottom:0;padding-left:5px;padding-right:5px;position:relative;top:0;left:0;right:0;display:block;margin:0;box-sizing:content-box;height:22px;line-height:22px;">Yes</a>\n    </td>\n\n    <td style="width:30px;padding:5px">Oh yeah</td>\n  </tr>\n</table>\n\n\nNow my hyperlink only covers the first td, but not the second one. What could be done?\n\nI do not want to use JavaScript. I do not want to copy the link to both table cells.\n    ',
    title: "HTML hyperlink to cover several table cells",
    id: 485,
    PostTypeId: 1,
    bounty: 0.5019897461386584,
    UserId: 69,
    viewCount: 4,
    upvoteCount: 10,
    comments: 2
  },
  {
    body:
      '\nas a link in each td is not a good alternative and using js is a bit dirty, here is another html/css approach:\n\nHTML:\n\n<div class="table">\n<a class="table-row" href="/mylink">\n    <div class="table-cell">...</div>\n    <div class="table-cell">...</div>\n    <div class="table-cell">...</div>\n</a>\n\n\n\nCSS:\n\n.table { display:table; }\n.table-row { display:table-row; }\n.table-cell { display:table-cell; }\n\n\nHere is a working JSFiddle\n\nPersonally, I would prefer to put a seperate link in each td that points to the same URL, to keep things simple:\n\n<table>\n    <tr>\n        <td>\n            <a href="http://url/stuff">\n                First column\n            </a>\n        </td>\n        <td>\n            <a href="http://url/stuff">\n                Second column\n            </a>\n        </td>\n    </tr>\n</table>\n\n    ',
    id: 486,
    PostTypeId: 2,
    PostId: 485,
    bounty: 0.5019897461386584,
    UserId: 97,
    upvoteCount: 23
  },
  {
    body:
      '\n    <table style="position: relative">\n  <tr>\n    <td style="width:100px;padding:0">\n      <a href="yes.htm" style="position: absolute; width: 100%">Yes</a>\n    </td>\n\n    <td style="width:30px;padding:5px">Oh yeah</td>\n  </tr>\n</table>\n\n\nBy making the link absolute you pull it out of it\'s layer and by giving it a width of 100, the link extends to the next TD element.\n\nTo prevent the anchor tag from overflowing, give the table a relative position to confine the absolute element to the table width.\n\nHere is a JSFiddle \n    ',
    id: 487,
    PostTypeId: 2,
    PostId: 485,
    bounty: 0.5019897461386584,
    UserId: 44,
    upvoteCount: 11
  },
  {
    body:
      "\n\ni have some trouble with a plugin that work with an older version of jquery but not with newers :/\n\nit's originally from this page\nhttp://tympanus.net/codrops/2011/06/09/grid-navigation-effects/\n\nafter some debugging it seems that these lines are guilty :\n\nvar currentRows = '', nextRows = '';\n                for( var i = 0; i < opts.rows; ++i ) {\n                    currentRows += '.tj_row_' + (config.currentRow + i) + ',';\n\n                    (dir === 1)\n                        ? nextRows  += '.tj_row_' + (config.currentRow + opts.rows + i) + ','\n                        : nextRows  += '.tj_row_' + (config.currentRow - 1 - i) + ',';\n                }\n\n\nthe error in the console is\n\n\n  jquery.min.js:4 Uncaught Error: Syntax error, unrecognized expression:\n  .tj_row_1,.tj_row_2,.tj_row_3,(…)\n\n\nif i comment them i don't have the error in the console but the pluging don't work properly .\n\nthis lines of code are working perfectly in jquery 1.6.1 but not in 1.9.1 \n\nany idea on what's going on and how to fix that please ?\n\nthanks !\n    ",
    title: "upgrade some code to a newer version of jquery",
    id: 488,
    PostTypeId: 1,
    bounty: 0.5651110454061794,
    UserId: 39,
    viewCount: 3,
    upvoteCount: 25,
    comments: 1
  },
  {
    body:
      "\nYou have to use jQuery Migrate plugin when updated to 1.9.1, see details in https://blog.jquery.com/2013/02/04/jquery-1-9-1-released/ \n    ",
    id: 489,
    PostTypeId: 2,
    PostId: 488,
    bounty: 0.5651110454061794,
    UserId: 69,
    upvoteCount: 29
  },
  {
    body:
      '\n\nI have this in my db:\n\n{\n    "id": "d40110a1-c0ca-47e0-95ca-086e905dd53c",\n    "somefiled": [\n        {\n            "city_name": "Aadorf",\n            "de": "Aadorf",\n            "en": "Aadorf",\n            "fr": "Aadorf",\n            "it": "Aadorf",\n            "kanton_de": "Thurgau",\n            "kanton_en": "Thurgovie",\n            "kanton_fr": "Thurgau",\n            "kanton_it": "Turgovia"\n        },\n        {\n            "city_name": "Aarau",\n            "de": "Aarau",\n            "en": "Aarau",\n            "fr": "Aarau",\n            "it": "Aarau",\n            "kanton_de": "Aargau",\n            "kanton_en": "Argovie",\n            "kanton_fr": "Aargau",\n            "kanton_it": "Argovia"\n        }//many more records here]\n}\n\n\nHow can I extract all array elements in  somefiled where value for kanton_en is Argovie?\n\nSomething like this:\n\nr.db("test").table("table").getField("somefiled").filter(function(row){\n\n  return row("kanton_en").eq("Argovie")\n})\n\n\nBut that is of course returning nothing.\n    ',
    title: "how to iterate and filter over rethinkdb db filed?",
    id: 490,
    PostTypeId: 1,
    bounty: 0.008539664844138706,
    UserId: 70,
    viewCount: 10,
    upvoteCount: 17,
    comments: 1
  },
  {
    body:
      '\nSolved with:\n\nr.db("test").table("test").getField("somefiled").concatMap(function(row){\n\n  return row.filter(function(b){\n\n    return b("kanton_en").eq("Argovie")\n  })\n})\n\n    ',
    id: 491,
    PostTypeId: 2,
    PostId: 490,
    bounty: 0.008539664844138706,
    UserId: 17,
    upvoteCount: 11
  },
  {
    body:
      "\n\nWhen I try to reset the MySQL root password on ubuntu system with the following command\n\nupdate user set password=PASSWORD(\"newPwd\") where User=\"root\";\n\n\nI see the error as, \n\nERROR 1054 (42S22): Unknown column 'password' in 'field list'\n\n    ",
    title: "Reset &#39;root&#39; user password in MySQL 5.7.x+",
    id: 492,
    PostTypeId: 1,
    bounty: 0.13858645805670244,
    UserId: 9,
    viewCount: 10,
    upvoteCount: 10,
    comments: 1
  },
  {
    body:
      "\nIn MySQL 5.7, the password field in mysql.user table field was removed, now the field name is 'authentication_string'. \n\nFollow these steps to reset 'root' password on Ubuntu \n\nStop the Service\n\nsudo /etc/init.d/mysql stop\n\n\nStart MySQL without a password\n\nsudo mysqld_safe --skip-grant-tables &\n\n**Note: the following command didn't work for me**\nmysqld --skip-grant-tables &\n\n\nConnect to MySQL\n\nmysql -uroot\n\n\nSet a new MySQL root password\n\nmysql>  use mysql;\n\nmysql>  update user set authentication_string=password('yourNewPwd') where user='root';\n\nmysql>  flush privileges;\n\nmysql>  quit\n\n\nRe-start mysql service\n\nsudo /etc/init.d/mysql stop\n\nsudo /etc/init.d/mysql start\n\n\nNow, you can login with your updated password\n\nmysql -u root -p\n\n    ",
    id: 493,
    PostTypeId: 2,
    PostId: 492,
    bounty: 0.13858645805670244,
    UserId: 10,
    upvoteCount: 12
  },
  {
    body:
      "\n\nSo, this question relates to classes and functions.\n\nI have a class CountryCatalogue that has a function findMostPopulousContinent. CountryCatalogue has several instance variables; self._name (country name), self._continent (the continent the country is in), self._population(of the country), and self._area (surface area). \nthe function findMostPopulousContinent has to search through the instance variables to sort all the countries by their continent, and then add up the population of those countries to find the total population for that continent. Any ideas?\n\nEdit-\nSo far I am thinking something like this, for each continent;\n\n    def findMostPopulousContinent(self):\n    for entries in self._name:\n        if self._continent == \"Asia\":\n            continentpopulation = sum(self._population)\n\n\nBut I don't have much experience with classes using more than one input so I'm not sure if it can be manipulated this way.\n    ",
    title: "Function to sort through instance variables in a Class",
    id: 494,
    PostTypeId: 1,
    bounty: 0.762059371697607,
    UserId: 86,
    viewCount: 1,
    upvoteCount: 38,
    comments: 0
  },
  {
    body:
      '\n\nLet\'s assume we want to use timeit for some performance testing with different inputs.\n\nThe obvious, non-DRY way would be something like this:\n\nimport timeit\n\n# define functions to test\ndef some_list_operation_A(lst):\n    ...\n\ndef some_list_operation_B(lst):\n    ...\n\n# create different lists (different input) to test the functions with\n...\ninputs = [lsta, lstb, lstc, ...]\n\n# measure performance with first function\nnum = 10\nt_lsta = timeit.timeit("some_list_operation_A(lsta)",\n                        setup="from __main__ import some_list_operation_A, lsta",\n                        number=num)\nt_lstb = timeit.timeit("some_list_operation_A(lstb)",\n                        setup="from __main__ import some_list_operation_A, lstb",\n                        number=num)\nt_lstc = timeit.timeit("some_list_operation_A(lstc)",\n                        setup="from __main__ import some_list_operation_A, lstc",\n                        number=num)\n...\n\n# print results & do some comparison stuff\nfor res in [t_lsta, t_lstb, t_lstc, ...]:\n    print("{:.4f}s".format(res))\n    ...\n\n# do this ALL OVER AGAIN for \'some_list_operation_B\'\n...\n\n# print new results\n\n# do this ALL OVER AGAIN for \'some_list_operation_C\'\n# ...I guess you\'ll got the point\n...\n\n\nI think it should be very clear that this would be a really ugly way to measure the performance of different functions for different input.\n\nWhat I currently do is something like this:\n\n...\ninputs = dict()\ninputs["lsta"] = lsta\ninputs["lstb"] = lstb\ninputs["lstc"] = lstc\n\nfor f in ["some_list_operation_A", "some_list_operation_B", ...]:\n    r = dict()  # results\n    for key, val in inputs.iteritems():\n        r[key] = timeit.timeit("{}(inputs[{}])".format(f, key),\n                                setup="from __main__ import {}, inputs".format(f),\n                                number=num\n\n    # evaluate results \'r\' for function \'f\' here\n    # (includes a comparison of the results -\n    #  that\'s why I save them in \'r\')\n    ...\n\n    # loop moves on to next function \'f\'\n\n\nBasically, I am using .format here to insert the function name and insert the right data inputs[key]. After .format fills all {}, the result is one correct stmt string of timeit.\n\nWhile this is a lot shorter than the obvious non-DRY solution, it is also less readable and more like hack, isn\'t it?\n\nWhat would be an appropriate DRY solution for such problems?\n\nI also thought of simply timing the functions with decorators (this would be neat?!) - but I did not succeed: the decorator should not only print the result. In my # evaluate results \'r\'-step I am not only printing the results, but I am also comparing them: like computing relative differences and stuff. Thus, I would need the decorator to return something in order to compare the results for each run...\n\nCan someone hint me in the right direction for a clean, pythonic solution? I would like to have more beautiful/ideomatic code...and especially: shorter code!\n    ',
    title:
      "Code execution time: how to properly DRY several timeit executions?",
    id: 495,
    PostTypeId: 1,
    bounty: 0.827793948284312,
    UserId: 29,
    viewCount: 9,
    upvoteCount: 30,
    comments: 0
  },
  {
    body:
      '\n\nI am using Angular and Spring Boot to build a Single Page app with Rest API. Here is my configuration:\n\n@SpringBootApplication\n@EnableOAuth2Sso\npublic class AppConfig extends SpringBootServletInitializer implements ApplicationContextAware  {\n\n    @Override\n    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {\n        return application.sources(AppConfig.class);\n    }\n\n    public static void main(String[] args) {\n        ApplicationContext appContext = SpringApplication.run(AppConfig.class);\n        context = appContext;\n    }\n\n    @Configuration\n    protected static class SecurityConfig extends WebSecurityConfigurerAdapter {\n        @Override\n        protected void configure(HttpSecurity http) throws Exception {\n            http.authorizeRequests()\n                    .antMatchers("/healthcheck", "/").permitAll()\n                    .antMatchers("/api/**").authenticated()\n                    .anyRequest().authenticated();\n        }\n    }\n\n}\n\n\nThe SSO service I am using is provided by Pivotal Cloud Foundry[PCF]. Everything was fine before I included \n\n\n  SecurityConfig\n\n\nclass. As soon as the app is loaded, user is redirected to the SSO login page and then redirected back to the app. But I need to exclude the "healthcheck" URL from authentication. That is why I included the SecurityConfig class. But now the SSO Authentication is not working at all. I could only reach /healthcheck.\n\nI followed this example https://spring.io/guides/tutorials/spring-boot-oauth2/\n\nCan someone please let me know what is wrong with my code?\n\nThanks.\n    ',
    title:
      "How to exclude a URL when usinf PCF SSO service with EnableOAuth2Sso annotation?",
    id: 496,
    PostTypeId: 1,
    bounty: 0.7902718817047791,
    UserId: 43,
    viewCount: 6,
    upvoteCount: 24,
    comments: 1
  },
  {
    body:
      '\nI figured it out. I had to move my EnableOAuth2Sso to the WebSecurityConfigurerAdapter. Like this:\n\n@SpringBootApplication\npublic class AppConfig extends SpringBootServletInitializer implements ApplicationContextAware  {\n\n    @Override\n    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {\n        return application.sources(AppConfig.class);\n    }\n\n    public static void main(String[] args) {\n        ApplicationContext appContext = SpringApplication.run(AppConfig.class);\n        context = appContext;\n    }\n\n    @Configuration\n    @EnableOAuth2Sso\n    protected static class SecurityConfig extends WebSecurityConfigurerAdapter {\n        @Override\n        protected void configure(HttpSecurity http) throws Exception {\n            http.authorizeRequests()\n                    .antMatchers("/healthcheck", "/").permitAll()\n                    .antMatchers("/api/**").authenticated()\n                    .anyRequest().authenticated();\n        }\n    }\n\n}\n\n    ',
    id: 497,
    PostTypeId: 2,
    PostId: 496,
    bounty: 0.7902718817047791,
    UserId: 47,
    upvoteCount: 9
  },
  {
    body:
      '\n\nI am using http://elasticsearch-dsl.readthedocs.io 0.0.10 and ES 1.7.3.\n\nI have faced some strange behavior during search: some words that I pass to "should" query breaks search, then search cannot find that words (I see that in console), but also a lot of other words too.\n\nIn code below, "should" query consist of 1000 clauses. My guess was that this word is not in vocabulary (I use Russian and English morphology config) - but no, with other unseen and special words search is good.\nSo, when I remove these "problem" words search is working again.\n\nThis is super strange - I tested "problem" words with https://django-haystack.readthedocs.io/en/v2.5.0/index.html and ES can find them....\n\nfor i in eat_search_raw_list_1024:\n    q = Q(\'bool\',\n        #must=[Q(\'match\', text=\'BBQ\')],\n        should=[(Q("match", text="\\\'bad service\\\'~3") | Q("match", text="\\\'bad eat\\\'~3")  .........1000 more................],\n        minimum_should_match=1, \n        _name=name_query \n    )            \n    s = Search(using=client, index="haystack").query(q).query(~Q("match", text=minus_words))    \n    s = s.highlight(\'text\', fragment_size=50)  \n    response = s.execute()\n\n    ',
    title: "Strange behavior: some words breaks search Elasticsearch",
    id: 498,
    PostTypeId: 1,
    bounty: 0.6663873238981737,
    UserId: 14,
    viewCount: 3,
    upvoteCount: 1,
    comments: 0
  },
  {
    body:
      '\n\ni made a filter for my ionic app that work very well on google chrome (whit the ionic serve) but when i build my apk it doesnt do anything what could be the problem?\n\nthis is the search code\n\n<ion-content class="fondo has-subheader">     \n    <div class="bar subheader item-input-inset bar-light">\n        <label class="item-input-wrapper">\n          <input type="search" ng-model="busqueda" placeholder="Buscar">\n        </label>\n      </div>\n\n      <ion-list>\n        <ion-item class="button button-icon center" ng-repeat="cate in categorias | filter: busqueda" type="item-text-wrap" href="#/tab/categoria/{{cate.id}}" > \n           <img class="img_cat" ng-src="{{cate.imagen}}" >\n         <h2 class="categoria_n">{{cate.nombre}}</h2>\n        </ion-item>\n      </ion-list>\n  </ion-content>\n\n    ',
    title: "ionic filter not working on my apk",
    id: 499,
    PostTypeId: 1,
    bounty: 0.03871652574986162,
    UserId: 60,
    viewCount: 3,
    upvoteCount: 30,
    comments: 1
  },
  {
    body:
      '\n<ion-content class="fondo has-subheader">     \n    <div class="bar subheader item-input-inset bar-light">\n        <label class="item-input-wrapper">\n          <input type="text" ng-model="search" placeholder="Buscar">\n        </label>\n      </div>\n      <ion-list>\n        <ion-item class="button button-icon center" ng-repeat="cate in categorias | filter : search" type="item-text-wrap" href="#/tab/categoria/{{cate.id}}" > \n           <img class="img_cat" ng-src="{{cate.imagen}}" >\n         <h2 class="categoria_n">{{cate.nombre}}</h2>\n        </ion-item>\n      </ion-list>\n  </ion-content>\n\n\nAnd try ui-sref  in replace of href="#/tab/categoria/{{cate.id}}"\n    ',
    id: 500,
    PostTypeId: 2,
    PostId: 499,
    bounty: 0.03871652574986162,
    UserId: 31,
    upvoteCount: 23
  },
  {
    body:
      "\n\nIn earlier versions of VS it was possible to use VS javascript debugger (which is awesome) to debug any website.  The \"trick\" was to create an empty web project, open IE within the instance of VS.   You could then just go to whatever page you wanted to debug and have full capacity of the debugger -- really handy when debugging more complicated apps.  I know this worked as recently as VS Web Developer Express 2008, but I am not able to get it working under either Web Express 2013 or VS 2015 Community.  I can't imagine they would remove this functionality, so I'm thinking I'm just doing it wrong.  For context, this link describes how it worked in older versions:\n\nhttp://blog.berniesumption.com/software/how-to-debug-javascript-in-internet-explorer/\n\nhttps://www.sitepoint.com/community/t/ie-javascript-debugging-with-visual-studio-express-a-visual-guide/3768  (unfortunately images are missing from this one)\n    ",
    title:
      "debugging javascript in Visual Studio Web Express 2013 or Visual Studio 2015 Community",
    id: 501,
    PostTypeId: 1,
    bounty: 0.06349056003353803,
    UserId: 38,
    viewCount: 9,
    upvoteCount: 7,
    comments: 1
  },
  {
    body:
      '\nI could debug it in my side using the VS2015 with the "debugger" keyword in the JavaScript code.\n\nOf course, please not enable the option "Disable Script debugging" in your IE setting.\n\n\n\n\n\n\n    ',
    id: 502,
    PostTypeId: 2,
    PostId: 501,
    bounty: 0.06349056003353803,
    UserId: 51,
    upvoteCount: 4
  },
  {
    body:
      '\n\nI am working on an app that successfully intercepts NEW_OUTGOING_CALL broadcast on outgoing calls and handles calls accordingly. Everything works perfectly fine on single SIM devices.  \n\nOn Dual SIM devices, I am able to detect which SIM is the default calling SIM by reading the ICCID (it changes depending on which SIM is the default calling SIM) and I am also able to handle calls accordingly (either handle it by my app or pass it back to the native dialer).  \n\nThe problem I am facing is when users choose the "Ask every time" option. When they choose that option, the ICCID is still read as whichever SIM was set as the default SIM last.  \n\nI would like to detect that users have chosen this option so I can pop up a dialog thats asks them, which SIM they want to conduct their call over.  \n\nI searched through stackoverflow and scoured everything I could find on Dual SIM but I couldn\'t find an answer to this question. All the logic I added into handling calls on Dual SIM phones has been rendered useless by this part.  \n\nIs there something I can read (whether its a broadcast or an intent extra or an android setting) that would tell me that users want to be asked which SIM to use every time they attempt a call?\n\nThanks for the help.\n    ',
    title:
      "Detect &quot;Ask Every Time&quot; setting on outgoing calls for Dual Sim Phones",
    id: 503,
    PostTypeId: 1,
    bounty: 0.943043396386134,
    UserId: 54,
    viewCount: 7,
    upvoteCount: 24,
    comments: 0
  },
  {
    body:
      "\n\nUsing powershell's Invoke-RestMethod to a service that uses Windows Authentication.\n\nI'm getting a 401.2 Not Authorized Exception, but I've confirmed via\n\n$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name\n\n\nthat I'm using the expected user.  I've verified that user is allowed in my service's web.config.  \n\nHere's my actual invocation:\n\nInvoke-RestService -Method \"POST\" -Uri $serviceApiUri -Body (ConvertTo-Json $body) -UseDefaultCredentials -ContentType \"application/json\"\n\n\nAnyone else have issues with PowerShell's Invoke-RestMethod with Windows Authentication?\n    ",
    title:
      "PowerShell Invoke-RestMethod cmdlet failing to send second authentication challenge?",
    id: 504,
    PostTypeId: 1,
    bounty: 0.35137732130834975,
    UserId: 43,
    viewCount: 6,
    upvoteCount: 2,
    comments: 0
  },
  {
    body:
      '\n\nI\'m trying to write my "personal" python version of STL binary file reader, according to WIKIPEDIA : A binary STL file contains :\n\n\nan 80-character (byte) headern which is generally ignored.\na 4-byte unsigned integer indicating the number of triangular facets in the file.\nEach triangle is described by twelve 32-bit floating-point numbers: three for the normal and then three for the X/Y/Z coordinate of each vertex – just as with the ASCII version of STL. After these follows a 2-byte ("short") unsigned integer that is the "attribute byte count" – in the standard format, this should be zero because most software does not understand anything else. --Floating-point numbers are represented as IEEE floating-point numbers and are assumed to be little-endian--\n\n\nHere is my code :\n\n#! /usr/bin/env python3\n\nwith open("stlbinaryfile.stl","rb") as fichier :\n\nhead=fichier.read(80) \nnbtriangles=fichier.read(4)\nprint(nbtriangles)\n\n\nThe output is :\n\nb\'\\x90\\x08\\x00\\x00\'\n\n\nIt represents an unsigned integer, I need to convert it without using any package (struct,stl...). Are there any (basic) rules to do it ?, I don\'t know what does \\x mean ? How does \\x90 represent one byte ? \n\nmost of the answers in google mention "C structs", but I don\'t know nothing about C.\n\nThank you for your time.\n    ',
    title: "STL binary file reader with Python",
    id: 505,
    PostTypeId: 1,
    bounty: 0.822250089604095,
    UserId: 20,
    viewCount: 3,
    upvoteCount: 39,
    comments: 2
  },
  {
    body:
      '\nThe typical way to interpret an integer is to use struct.unpack, like so:\n\nimport struct\n\nwith open("stlbinaryfile.stl","rb") as fichier :\n    head=fichier.read(80)\n    nbtriangles=fichier.read(4)\n    print(nbtriangles)\n    nbtriangles=struct.unpack("<I", nbtriangles)\n    print(nbtriangles)\n\n\nIf you are allergic to import struct, then you can also compute it by hand:\n\ndef unsigned_int(s):\n    result = 0\n    for ch in s[::-1]:\n        result *= 256\n        result += ch\n    return result\n\n...\nnbtriangles = unsigned_int(nbtriangles)\n\n\n\n\nAs to what you are seeing when you print b\'\\x90\\x08\\x00\\x00\'. You are printing a bytes object, which is an array of integers in the range [0-255]. The first integer has the value 144 (decimal) or 90 (hexadecimal). When printing a bytes object, that value is represented by the string \\x90. The 2nd has the value eight, represented by \\x08. The 3rd and final integers are both zero. They are presented by \\x00.\n\nIf you would like to see a more familiar representation of the integers, try:\n\nprint(list(nbtriangles))\n\n[144, 8, 0, 0]\n\n\nTo compute the 32-bit integers represented by these four 8-bit integers, you can use this formula:\n\ntotal = byte0 + (byte1*256) + (byte2*256*256) + (byte3*256*256*256)\n\n\nOr, in hex:\n\ntotal = byte0 + (byte1*0x100) + (byte2*0x10000) + (byte3*0x1000000)\n\n\nWhich results in:\n\n0x00000890\n\n\nPerhaps you can see the similarities to decimal, where the string "1234" represents the number:\n\n4 + 3*10 + 2*100 + 1*1000\n\n    ',
    id: 506,
    PostTypeId: 2,
    PostId: 505,
    bounty: 0.822250089604095,
    UserId: 60,
    upvoteCount: 4
  },
  {
    body:
      "\nSince you're using Python 3, you can use int.from_bytes. I'm guessing the value is stored little-endian, so you'd just do:\n\n nbtriangles = int.from_bytes(fichier.read(4), 'little')\n\n\nChange the second argument to 'big' if it's supposed to be big-endian.\n\nMind you, the normal way to parse a fixed width type is the struct module, but apparently you've ruled that out.\n\nFor the confusion over the repr, bytes objects will display ASCII printable characters (e.g. a) or standard ASCII escapes (e.g. \\t) if the byte value corresponds to one of them. If it doesn't, it uses \\x##, where ## is the hexadecimal representation of the byte value, so \\x90 represents the byte with value 0x90, or 144. You need to combine the byte values at offsets to reconstruct the int, but int.from_bytes does this for you faster than any hand-rolled solution could.\n\nUpdate: Since apparent int.from_bytes isn't \"basic\" enough, a couple more complex, but only using top-level built-ins (not alternate constructors) solutions. For little-endian, you can do this:\n\ndef int_from_bytes(inbytes):\n    res = 0\n    for i, b in enumerate(inbytes):\n        res |= b << (i * 8)  # Adjust each byte individually by 8 times position\n    return res\n\n\nYou can use the same solution for big-endian by adding reversed to the loop, making it enumerate(reversed(inbytes)), or you can use this alternative solution that handles the offset adjustment a different way:\n\ndef int_from_bytes(inbytes):\n    res = 0\n    for b in inbytes:\n        res <<= 8  # Adjust bytes seen so far to make room for new byte\n        res |= b   # Mask in new byte\n    return res\n\n\nAgain, this big-endian solution can trivially work for little-endian by looping over reversed(inbytes) instead of inbytes. In both cases inbytes[::-1] is an alternative to reversed(inbytes) (the former makes a new bytes in reversed order and iterates that, the latter iterates the existing bytes object in reverse, but unless it's a huge bytes object, enough to strain RAM if you copy it, the difference is pretty minimal).\n    ",
    id: 507,
    PostTypeId: 2,
    PostId: 505,
    bounty: 0.822250089604095,
    UserId: 78,
    upvoteCount: 27
  },
  {
    body:
      "\n\nI have a simple web app built using the angular CLI. I want it to communicate with a backend using web sockets. I have the backend already written and have tested with a simple index.html page that the server can send and receive on sockets.\n\nIn my angular-cli project I have setup a proxy config file to setup a proxy to the backend.\n\nproxy.conf.json\n\n{\n  \"/sock\": {\n    \"target\": \"http://localhost:3000\",\n    \"changeOrigin\": true,\n    \"ws\": true,\n    \"logLevel\": \"debug\"\n  }\n}\n\n\nThen start the server with the following.\n\nng serve --proxy-config proxy.conf.json\n\n\nFor now I have a service that simply attempts to open a socket and send a fixed string which I'm expecting to see logged by the backend.\n\nimport { Injectable } from '@angular/core';\nimport * as io from 'socket.io-client';\n\n@Injectable()\nexport class ChatService {\n\n  private socket: any;\n\n  constructor() {\n    this.socket = io({ 'path': '/sock' });\n    this.socket.emit('chat message', 'Hello World from browser!');\n   }\n\n}\n\n\nNote: I've had several go's at this with and without the /sock part of the url.\n\nI start both servers. Get no console errors in the browser. But in the angular CLI web pack server I get the following messages.\n\n10% building modules 2/2 modules 0 active[HPM] Proxy created: /sock  ->  http://localhost:3000\n[HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]\n\n[HPM] GET /sockjs-node/530/z1z3teld/websocket -> http://localhost:3000\n[HPM] Upgrading to WebSocket\n[HPM] Error occurred while trying to proxy request /sockjs-node/530/z1z3teld/websocket from localhost:4200 to http://localhost:3000 (ECONNRESET) (https://nodejs.org/api/errors.html#errors_common_system_errors)\n\n\nAre web sockets supported or have I made a silly mistake?\nThanks\n    ",
    title: "How to setup a proxy using web sockets and angular CLI",
    id: 508,
    PostTypeId: 1,
    bounty: 0.9760202181934041,
    UserId: 4,
    viewCount: 1,
    upvoteCount: 24,
    comments: 1
  },
  {
    body:
      '\nI managed to figure it out with a bit of trial and error. I looked at the console for the basic index.html page that works within the backend project. This backend project is basically the chat server demo application on the socket.io website. I noticed that when it opens up the web socket the url looks like the following:\n\nhttp://localhost:3000/socket.io/EIO=3&transport=websocket&sid=wTvdQTclHXJSUmAmAAAA\n\n\nSo back in the angular CLI project I modified my proxy config to include the /socket.io/ part plus also added a wildcard.\n\n{\n  "/sock/*": {\n    "target": "http://localhost:3000/socket.io/",\n    "ws": true,\n    "logLevel": "debug"\n  }\n}\n\n\nBingo! Now when the service is constructed it opens the socket and emits a message which I can see logged in the backend.\n    ',
    id: 509,
    PostTypeId: 2,
    PostId: 508,
    bounty: 0.9760202181934041,
    UserId: 72,
    upvoteCount: 11
  },
  {
    body:
      "\n\ngood afternoon, I have a problem and I could not solve it, I try to add a .c module to the linux kernel, it's just a .c file called\nStealth.c I have tried to find guides on how to add it step by step but I can not find it by any means, I am not very familiar with the kernel,\n\nthanks for your help\n    ",
    title: "Add module .C to linux kernel",
    id: 510,
    PostTypeId: 1,
    bounty: 0.7692160416422937,
    UserId: 12,
    viewCount: 8,
    upvoteCount: 8,
    comments: 1
  },
  {
    body:
      "\nAssuming you put this file is somewhere in your kernel source tree, the directory it's in should have a Makefile. Add the line \n\nobj-y += Stealth.o\n\nIf you want to deal with configuration, you'll probably want to add the object file to obj-$(CONFIG_WHATEVER) instead of obj-y, but I won't be going into how to add a configuration here.\n\nIf you're looking to compile your file as an external module, a quick google search pops http://www.tldp.org/LDP/lkmpg/2.6/html/x181.html which seems good enough.\n    ",
    id: 511,
    PostTypeId: 2,
    PostId: 510,
    bounty: 0.7692160416422937,
    UserId: 9,
    upvoteCount: 9
  }
];

postData = postData.map(post => {
  delete post.id;
  if (post.comments !== undefined) {
    post.commentCount = post.comments;
    delete post.comments;
  }
  return post
});

console.log(postData.slice(0,40))

module.exports = postData;
