import React,{useState,useEffect} from "react";
// React

// useState → State manage karta hai.

// useEffect → Component load hone ke baad code execute karta hai.
import { useNavigate } from "react-router";//useNavigate

//Page navigation ke liye use hota hai.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";//Card Components

//UI design banane ke liye use hote hain.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";//Input → User input lene ke liye.
import { Label } from "@/components/ui/label";//Label → Input ka naam show karta hai.
import { Separator } from "@/components/ui/separator";//Separator → Do sections ko divide karta hai.
import { Badge } from "@/components/ui/badge";//Badge → Small label dikhata hai.
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";//Dialog → Modal popup create karta hai.
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";//Select → Dropdown menu create karta hai.
import {

  getCategories,
  getQuizzesAdmin,
  updateQuiz,
  deleteQuiz
} from "../../services/quiz.service";
//getCategories()

// >Category fetch karta hai.

// getQuizzesAdmin()

// >Quiz fetch karta hai.

// updateQuiz()

// >Quiz update karta hai.

// deleteQuiz()

// >Quiz delete karta hai.
import {//Lucide icons
  Search,
  Plus,
  Edit2,
  Trash2,
  Globe,
  Lock,
  Tag,
  Clock,
  BookOpen,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";
export default function ManageQuizzesPage(){//Admin dashboard component hai.
const navigate = useNavigate();

  // Data states
  const [quizzes, setQuizzes] = useState([])
  const [categories, setCategories] = useState([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);

  // Filters
  const [quizSearch, setQuizSearch] = useState("");

  // Modals state
  const [editingQuiz, setEditingQuiz] = useState(null); // quiz object or null
  const [deletingQuizId, setDeletingQuizId] = useState(null); // id or null
  const [isUpdatingQuiz, setIsUpdatingQuiz] = useState(false);
  const [isDeletingQuiz, setIsDeletingQuiz] = useState(false);
}// Load quizzes
  const loadQuizzes = async () => {
    
    //loadQuizzes()

Purpose:

//Backend se quizzes fetch karta hai.
     setIsLoadingQuizzes(true);
    try {
      const res = await getQuizzesAdmin({ limit: 100 });
      //getQuizzesAdmin()

//Backend se quiz data fetch karta hai.
      if (res && res.status === "success") {
        setQuizzes(res.data.quizzes || []);
      }
    } catch (err) {//catch()

//Errors handle karta hai.
      console.error(err);
      toast.error("Failed to load quizzes");
    } finally {
      setIsLoadingQuizzes(false);
      //finally

//Loading OFF karta hai.
    }
  };

  // Load categories (needed for editing dropdown)
  const loadCategories = async () => {
    loadCategories()

Purpose:

//Backend se categories fetch karta hai.
    try {//safe exection block
      const res = await getCategories();
      if (res && res.data) {
        setCategories(res.data || [])//Agar data hai → data save karo

//Nahi hai → empty array save karo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadQuizzes();//loadQuizzes()

//Quiz data fetch karta hai.
    loadCategories();
  }, []);//[]

// Empty dependency array

// → useEffect sirf ek baar execute hoga.);
// Toggle quiz publish status inline
  const handleTogglePublish = async (quiz)=>{
    try {
      const updatedStatus = !quiz.isPublished;
      const res = await updateQuiz(quiz._id, { isPublished: updatedStatus });
      if (res && res.status === "success") {
        toast.success(`Quiz ${updatedStatus ? "published" : "unpublished"} successfully`);
        setQuizzes(prev => prev.map(q => q._id === quiz._id ? { ...q, isPublished: updatedStatus } : q));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quiz status");
    }
  };
 
  //Sumbit edit Quiz
   const handleEditQuizSubmit = async (e) => {
    e.preventDefault();
    if (!editingQuiz.title.trim()) return toast.error("Quiz title is required");

    setIsUpdatingQuiz(true);
    try {
      const tagsArray = typeof editingQuiz.tags === "string"
        ? editingQuiz.tags.split(",").map(t => t.trim()).filter(Boolean)
        : editingQuiz.tags;

      const payload = {
        title: editingQuiz.title,
        description: editingQuiz.description,
        categoryId: editingQuiz.categoryId || editingQuiz.category?._id,
        difficulty: editingQuiz.difficulty,
        timer: Number(editingQuiz.timer) || 15,
        isPublished: editingQuiz.isPublished,
        tags: tagsArray,
      };
      
       const res = await updateQuiz(editingQuiz._id, payload);
      if (res && res.status === "success") {
        toast.success("Quiz updated successfully");
        setEditingQuiz(null);
        loadQuizzes();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quiz");
    } finally {
      setIsUpdatingQuiz(false);
    }
  };

  //sumbit delete Quiz
  const handleDeleteQuizConfirm = async () => {
    setIsDeletingQuiz(true);
    try {
      const res = await deleteQuiz(deletingQuizId);
      if (res && res.status === "success") {
        toast.success("Quiz deleted successfully");
        setDeletingQuizId(null);
        loadQuizzes();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete quiz");
    } finally {
      setIsDeletingQuiz(false);
    }
  };
      