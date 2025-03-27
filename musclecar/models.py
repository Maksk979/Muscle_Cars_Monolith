from django.db import models

class Car(models.Model):
    """Модель для хранения информации об автомобилях"""
    name = models.CharField('Название', max_length=100)
    year = models.IntegerField('Год выпуска')
    engine = models.CharField('Двигатель', max_length=50)
    horsepower = models.IntegerField('Мощность (л.с.)')
    image_url = models.URLField('URL изображения')
    
    def __str__(self):
        return f"{self.year} {self.name}"

    class Meta:
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'