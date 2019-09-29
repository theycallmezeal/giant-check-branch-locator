from django.shortcuts import render
from branches.models import Branch

# Create your views here.
from django.http import HttpResponse


def branch_width(request, id):
	branch = Branch.objects.get(br_id=id)
	return HttpResponse(branch.width / 10)