from django.core.management.base import BaseCommand, CommandError
from branches.models import Branch
import json
from random import randint as rInt

class Command(BaseCommand):

    def handle(self, *args, **options):
        f = open("branches.json","r")
        thing = json.load(f)
        f.close()
        
        for i in range(len(thing)):
            b = Branch(br_id=thing[i]["_id"], width=rInt(80,240))
            b.save()
            
            