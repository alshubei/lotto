package lottoHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.function.Consumer;
import org.eclipse.xtend2.lib.StringConcatenation;
import org.eclipse.xtext.xbase.lib.Conversions;
import org.eclipse.xtext.xbase.lib.Functions.Function1;
import org.eclipse.xtext.xbase.lib.InputOutput;
import org.eclipse.xtext.xbase.lib.IterableExtensions;
import org.eclipse.xtext.xbase.lib.ListExtensions;

@SuppressWarnings("all")
public class Main {
  public static void main(final String[] args) {
    StringConcatenation _builder = new StringConcatenation();
    _builder.append(Numbers.ours_7_5_2021);
    _builder.newLineIfNotEmpty();
    _builder.append(Numbers.ours_14_5_2021);
    _builder.newLineIfNotEmpty();
    _builder.append(Numbers.won_2021);
    _builder.newLineIfNotEmpty();
    _builder.append(Numbers.won_2020);
    _builder.newLineIfNotEmpty();
    final String input = _builder.toString();
    final ArrayList<String> newDraws = new ArrayList<String>();
    final String[] draws2 = input.split("\n");
    for (final String draw : draws2) {
      {
        final Function1<String, String> _function = new Function1<String, String>() {
          @Override
          public String apply(final String it) {
            return it.trim();
          }
        };
        final Function1<String, Boolean> _function_1 = new Function1<String, Boolean>() {
          @Override
          public Boolean apply(final String it) {
            int _length = it.length();
            return Boolean.valueOf((_length > 0));
          }
        };
        final List<String> nums = IterableExtensions.<String>toList(IterableExtensions.<String>filter(ListExtensions.<String, String>map(((List<String>)Conversions.doWrapArray(IterableExtensions.<String>last(((Iterable<String>)Conversions.doWrapArray(draw.split(":")))).replace("\t", " ").split(" "))), _function), _function_1));
        final Function1<String, Integer> _function_2 = new Function1<String, Integer>() {
          @Override
          public Integer apply(final String it) {
            return Integer.valueOf(Main.toInt(it));
          }
        };
        final List<Integer> fiveDigits = IterableExtensions.<Integer>sort(IterableExtensions.<Integer>toList(IterableExtensions.<String, Integer>map(IterableExtensions.<String>take(nums, 5), _function_2)));
        final Function1<String, Integer> _function_3 = new Function1<String, Integer>() {
          @Override
          public Integer apply(final String it) {
            return Integer.valueOf(Main.toInt(it));
          }
        };
        final List<Integer> superDigits = IterableExtensions.<Integer>sort(IterableExtensions.<Integer>toList(IterableExtensions.<String, Integer>map(IterableExtensions.<String>take(ListExtensions.<String>reverse(nums), 2), _function_3)));
        String _plus = (fiveDigits + " ");
        final String newDraw = (_plus + superDigits);
        newDraws.add(newDraw);
      }
    }
    Collections.<String>sort(newDraws);
    Main.printDuplicatedDraws(newDraws);
  }
  
  public static void printDraws(final List<String> drs) {
    final Consumer<String> _function = new Consumer<String>() {
      @Override
      public void accept(final String draw) {
        InputOutput.<String>println(draw);
      }
    };
    drs.forEach(_function);
  }
  
  public static String printDuplicatedDraws(final List<String> drs) {
    String _xblockexpression = null;
    {
      final HashSet<String> xs = new HashSet<String>();
      final HashSet<String> duplicates = new HashSet<String>();
      final Consumer<String> _function = new Consumer<String>() {
        @Override
        public void accept(final String draw) {
          boolean _contains = xs.contains(draw);
          if (_contains) {
            InputOutput.<String>println((draw + " duplicate"));
            duplicates.add(draw);
          } else {
            xs.add(draw);
          }
          InputOutput.<String>println(draw);
        }
      };
      drs.forEach(_function);
      _xblockexpression = InputOutput.<String>println(("Duplicates " + duplicates));
    }
    return _xblockexpression;
  }
  
  public static int toInt(final String s) {
    return Integer.parseInt(s);
  }
  
  public static void printDraw(final String dr) {
    final ArrayList<Object> wons = new ArrayList<Object>();
  }
  
  public static List<String> processDraw(final String s) {
    final String[] x = IterableExtensions.<String>last(((Iterable<String>)Conversions.doWrapArray(s.split(":")))).replace("\t", " ").split(" ");
    return (List<String>)Conversions.doWrapArray(x);
  }
}
