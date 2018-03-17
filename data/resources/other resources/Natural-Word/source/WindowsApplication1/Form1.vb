Public Class Form1

    Public lstTuile As New List(Of tuile)
    Public tmpBitmap As Bitmap

    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        CreerMap()
        NewBiome(41, 63) ' arbre
        NewBiome(1, 30) ' eau
        NewBiome(141, 20) ' herbe
        NewBiome(61, 8) ' neige

        getDetail(201, 21, 80) : getDetail(161, 21, 200) : getDetail(121, 21, 400) : getDetail(181, 61, 450) : getDetail(221, 21, 50) : getDetail(241, 21, 150) : getDetail(261, 21, 150)

        Dessiner()
    End Sub

    ' # Création des éléments avec leurs position de la carte.
    Public Sub CreerMap()
        If tmpBitmap IsNot Nothing Then tmpBitmap.Dispose()
        tmpBitmap = New Bitmap("t.png") : tmpBitmap = tmpBitmap.Clone(New Rectangle(21, 0, 19, 23), tmpBitmap.PixelFormat)

        Dim b = 5
        For a = 0 To 31
            If b = 0 Then : b = 9 : Else : b = 0 : End If
            For i = 0 To 39 : lstTuile.Add(New tuile With {.Type = 21, .Img = New Bitmap(tmpBitmap), .Position = New Point((i * 18) + 10 + b, (a * 22) - (8 * a) + 5)})
            Next
        Next

        tmpBitmap.Dispose()
    End Sub

    ' # Création des biomes.
    Public Sub NewBiome(ByVal tuile As Int16, ByVal boucle As Int16)
        ' If tmpBitmap IsNot Nothing Then tmpBitmap.Dispose()
        tmpBitmap = New Bitmap("t.png") : tmpBitmap = tmpBitmap.Clone(New Rectangle(tuile, 0, 19, 23), tmpBitmap.PixelFormat)

        Dim rnd As New Random : Randomize()
        For a = 0 To boucle
            Dim z = rnd.Next(0, (31 * 39) + 30)
            For i = 0 To 4
                If (z + i > 0) And (z + i < ((31 * 39) + 30)) Then lstTuile(z + i).Img = tmpBitmap
                If (z + i - 40) > 0 And (z + i - 40 < ((31 * 39) + 30)) And i < 4 Then lstTuile(z + i - 40).Img = tmpBitmap : lstTuile(z + i - 40).Type = tuile
                If (z + i + 40) > 0 And (z + i + 40 < ((31 * 39) + 30)) And i < 4 Then lstTuile(z + i + 40).Img = tmpBitmap : lstTuile(z + i + 40).Type = tuile
                If (z + i - 80) > 0 And (z + i - 80 < ((31 * 39) + 30)) And i = 2 Then lstTuile(z + i - 80).Img = tmpBitmap : lstTuile(z + i - 80).Type = tuile
                If (z + i + 80) > 0 And (z + i + 80 < ((31 * 39) + 30)) And i = 2 Then lstTuile(z + i + 80).Img = tmpBitmap : lstTuile(z + i + 80).Type = tuile
            Next
        Next

    End Sub

    ' # Création des tuiles detail
    Public Sub getDetail(ByVal newTuille As Int16, ByVal preTuille As Int16, ByVal boucle As Int16)
        Dim rnd As New Random : Randomize()
        tmpBitmap = New Bitmap("t.png") : tmpBitmap = tmpBitmap.Clone(New Rectangle(newTuille, 0, 19, 23), tmpBitmap.PixelFormat) ' herbe foncé

        For a = 0 To boucle
            Dim z = rnd.Next(0, (31 * 39) + 30)
            If lstTuile(z).Type = preTuille Then lstTuile(z).Img = tmpBitmap : lstTuile(z).Type = newTuille
        Next
    End Sub

    ' # Dessines tous les éléments de la carte.
    Public Sub Dessiner()

        tmpBitmap = New Bitmap(PictureBox1.Width, PictureBox1.Height)
        Dim graph As Graphics = Graphics.FromImage(tmpBitmap)
        For i = 0 To (31 * 39) + 30 : graph.DrawImage(lstTuile(i).Img, lstTuile(i).Position)
        Next

        graph.Dispose()
        PictureBox1.Image = tmpBitmap
    End Sub

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        PictureBox1.Image.Dispose()
        For Each el In lstTuile : el.Img.Dispose()
        Next
        tmpBitmap.Dispose() : lstTuile.Clear()

        CreerMap()
        NewBiome(41, 63) ' arbre
        NewBiome(1, 30) ' eau
        NewBiome(141, 20) ' herbe
        NewBiome(61, 8) ' neige

        getDetail(201, 21, 80) : getDetail(161, 21, 200) : getDetail(121, 21, 400) : getDetail(181, 61, 450) : getDetail(221, 21, 50) : getDetail(241, 21, 150) : getDetail(261, 21, 150)

        Dessiner()
    End Sub
End Class
