using System;

namespace SiqaretDeyeriHesablayici
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Siqaret Dəyəri Hesablayıcı Proqramına Xoş Gəlmisiniz!");

            // Gündəlik siqaret sayı
            Console.Write("Gündə neçə siqaret çəkirsiniz? ");
            int gunlukSiqaretSayi = int.Parse(Console.ReadLine());

            // Bir qutunun qiyməti
            Console.Write("Bir qutunun qiyməti (AZN): ");
            double qutuQiymeti = double.Parse(Console.ReadLine());

            // Bir qutudakı siqaret sayı
            Console.Write("Bir qutuda neçə siqaret var? ");
            int qutudakiSiqaretSayi = int.Parse(Console.ReadLine());

            // Hesablama müddəti
            Console.Write("Hesablama müddəti (gün, ay, il): ");
            string muddet = Console.ReadLine().ToLower();

            // Gündəlik xərc hesablanır
            double gunlukXerc = (gunlukSiqaretSayi * qutuQiymeti) / qutudakiSiqaretSayi;

            // Müddətə uyğun ümumi xərci hesabla
            double umumiXerc = 0;
            if (muddet == "gün")
            {
                umumiXerc = gunlukXerc;
            }
            else if (muddet == "ay")
            {
                umumiXerc = gunlukXerc * 30; // Ayda 30 gün var hesab edilir
            }
            else if (muddet == "il")
            {
                umumiXerc = gunlukXerc * 365; // İldə 365 gün var
            }
            else
            {
                Console.WriteLine("Düzgün bir müddət seçilməyib.");
                return;
            }

            // Nəticəni göstər
            Console.WriteLine($"\nSeçilmiş müddət üçün ümumi xərc: {umumiXerc:F2} AZN");
            Console.WriteLine("Siqaret çəkməyin sağlamlıq və maliyyə zərərlərini unutmayın!");
        }
    }
}
