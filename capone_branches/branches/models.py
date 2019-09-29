from django.db import models
# Create your models here.
            
class Branch(models.Model):
    
    def __str__(self):
        return self.br_id+" , "+str(self.width)
        
    br_id = models.CharField(max_length=24,default="")
    width = models.IntegerField(default=0)

