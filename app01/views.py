from django.shortcuts import render,HttpResponse,redirect
from app01.models import models

# Create your views here.
#首页
def index(request):
    return render(request, "index.html")

#解决问题
def batterypackupgrades(request):
    return render(request, "solution/batterypackupgrades.html")

def outdoorsBattery(request):
    return render(request,"solution/outdoorsBattery.html")

def processassurance(request):
    return render(request,"solution/processassurance.html")

#研发
def strengthcertification(request):
    return render(request,"research/strengthcertification.html")

def coretechnology(request):
    return render(request,"research/coretechnology.html")

#新闻
def news (request):
    return render(request, "news.html")

